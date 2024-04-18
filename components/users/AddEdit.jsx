import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import isEmailValidator from "validator/lib/isEmail";
import { useState, useEffect } from "react";

import { userService, alertService, trainingService } from "services";
// composant AddEdit est utilisé à la fois pour ajouter et modifier des utilisateurs, il contient un formulaire construit avec la bibliothèque React Hook Form et est utilisé par la page d'ajout d'utilisateur et la page de modification d'utilisateur .

export { AddEdit };

function AddEdit(props) {
  const user = props?.user;
  const router = useRouter();

  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    trainingService.getAll().then((x) => setTrainings(x));
  }, []);

  // Les règles de validation de formulaire sont définies avec la bibliothèque de validation de schéma Yup et transmises avec la fonction formOptionsReact Hook Form useForm()
  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Le prenom est requis"),
    lastName: Yup.string().required("Le nom est requis"),
    email: Yup.string()
      .email("le format est érroné")
      .required("Email est requis")
      .test(
        "is-valid",
        (message) => `${message.path} est érroné`,
        (value) =>
          value
            ? isEmailValidator(value)
            : new Yup.ValidationError("Valeur erronée")
      ),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      // password optional in edit mode
      .concat(user ? null : Yup.string().required("le mot de passe est requis"))
      .min(6, "Le mot de passe doit contenir 6 caractères"),
    trainingId: Yup.number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable(),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (user) {
    formOptions.defaultValues = props.user;
  }

  // get functions to build form with useForm() hook
  // La useForm()fonction hook renvoie un objet avec des méthodes pour travailler avec un formulaire, notamment l'enregistrement des entrées, la gestion de la soumission du formulaire, la réinitialisation du formulaire, l'accès à l'état du formulaire, l'affichage des erreurs et plus encore
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // La onSubmitfonction est appelée lorsque le formulaire est soumis et valide, et crée ou met à jour un utilisateur en fonction du mode dans lequel il se trouve.

  async function onSubmit(data) {
    alertService.clear();
    try {
      // create or update user based on user prop
      let message;
      if (user) {
        await userService.update(user.id, data);
        message = "membre modifié";
      } else {
        await userService.register(data);
        message = "membre ajouté";
      }

      // redirect to user list with success message
      router.push("/users");
      alertService.success(message, true);
    } catch (error) {
      alertService.error(error);
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">Prenom</label>
          <input
            name="firstName"
            type="text"
            {...register("firstName")}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="mb-3 col">
          <label className="form-label">Nom</label>
          <input
            name="lastName"
            type="text"
            {...register("lastName")}
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="text"
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>
        <div className="mb-3 col">
          <label className="form-label">
            Password
            {user && (
              <em className="ms-1">(Leave blank to keep the same password)</em>
            )}
          </label>
          <input
            name="password"
            type="password"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">role</label>
          <input
            name="roles"
            type="text"
            {...register("roles")}
            className={`form-control ${errors.roles ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.roles?.message}</div>
        </div>
      </div>
      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">
            Abonnement - ( Actuel est
            {user && user.trainingId === null
              ? "Inexistant"
              : user?.trainingId}{" "}
            )
          </label>
          <select
            name="trainingId"
            {...register("trainingId")}
            className={`form-control ${errors.trainingId ? "is-invalid" : ""}`}
          >
            <option value={null}>Pas d'abonnements</option>
            {trainings &&
              trainings.map((training) => (
                <option value={training.id} key={training.id}>
                  {training.title}
                </option>
              ))}
          </select>
          <div className="invalid-feedback">{errors.trainingId?.message}</div>
        </div>
      </div>
      <div className="mb-3">
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="btn btn-primary me-2"
        >
          {formState.isSubmitting && (
            <span className="spinner-border spinner-border-sm me-1"></span>
          )}
          Enregistrer
        </button>
        <button
          onClick={() => reset(formOptions.defaultValues)}
          type="button"
          disabled={formState.isSubmitting}
          className="btn btn-secondary"
        >
          Reset
        </button>
        <Link href="/users" className="btn btn-link">
          Annuler
        </Link>
      </div>
    </form>
  );
}
