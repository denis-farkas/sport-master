import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState, useEffect } from "react";
// l utilisateur peut ajouter un entrainent

import {
  alertService,
  trainingService,
  spaceService,
  equipmentService,
  userService,
} from "services";
// composant AddEdit est utilisé à la fois pour ajouter et modifier des utilisateurs, il contient un formulaire construit avec la bibliothèque React Hook Form et est utilisé par la page d'ajout d'utilisateur et la page de modification d'utilisateur .

export { AddEditTraining };

function AddEditTraining(props) {
  const training = props?.training;
  const router = useRouter();

  const [spaces, setSpaces] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    spaceService.getAll().then((x) => setSpaces(x));
    equipmentService.getAll().then((x) => setEquipments(x));
    userService.getAll().then((users) => {
      const filteredUsers = users.filter(
        (user) => user.roles === "EMPLOYEE" || user.roles === "ADMIN"
      );
      setEmployees(filteredUsers);
    });
  }, []);

  // Les règles de validation de formulaire sont définies avec la bibliothèque de validation de schéma Yup et transmises avec la fonction formOptionsReact Hook Form useForm()
  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Un contenu est requis"),
    price: Yup.number().required("Un contenu est requis"),
    spaceId: Yup.number().required("Un contenu est requis"),
    equipmentId: Yup.number().required("Un contenu est requis"),
    employeeId: Yup.number().required("Un contenu est requis"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (training) {
    formOptions.defaultValues = props.training;
  }

  // get functions to build form with useForm() hook
  // La useForm()fonction hook renvoie un objet avec des méthodes pour travailler avec un formulaire, notamment l'enregistrement des entrées, la gestion de la soumission du formulaire, la réinitialisation du formulaire, l'accès à l'état du formulaire, l'affichage des erreurs et plus encore
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // La onSubmitfonction est appelée lorsque le formulaire est soumis et valide, et crée ou met à jour un utilisateur en fonction du mode dans lequel il se trouve.

  async function onSubmit(data) {
    alertService.clear();
    try {
      // create or update training based on training prop
      let message;
      if (training) {
        await trainingService.update(training.id, data);
        message = "entrainement modifié";
      } else {
        await trainingService.register(data);
        message = "entrainement ajouté";
      }

      // redirect to user list with success message
      router.push("/trainings");
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
          <label className="form-label">Nom</label>
          <input
            name="title"
            type="text"
            {...register("title")}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.title?.message}</div>
        </div>

        <div className="mb-3 col">
          <label className="form-label">Prix</label>
          <input
            name="price"
            type="text"
            {...register("price")}
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.price?.message}</div>
        </div>
      </div>

      <div className="row">
        <div className="mb-3 col">
          <label className="form-label">Espace</label>
          <select
            name="spaceId"
            {...register("spaceId")}
            className={`form-control ${errors.spaceId ? "is-invalid" : ""}`}
          >
            <option value=""></option>
            {spaces &&
              spaces.map((space) => (
                <option value={space.id} key={space.id}>
                  {space.name}
                </option>
              ))}
          </select>
          <div className="invalid-feedback">{errors.spaceId?.message}</div>
        </div>

        <div className="mb-3 col">
          <label className="form-label">Equipement</label>
          <select
            name="equipmentId"
            {...register("equipmentId")}
            className={`form-control ${errors.equipmentId ? "is-invalid" : ""}`}
          >
            <option value=""></option>
            {equipments &&
              equipments.map((equipment) => (
                <option value={equipment.id} key={equipment.id}>
                  {equipment.name}
                </option>
              ))}
          </select>
          <div className="invalid-feedback">{errors.equipmentId?.message}</div>
        </div>

        <div className="mb-3 col">
          <label className="form-label">Instructeur</label>
          <select
            name="employeeId"
            {...register("employeeId")}
            className={`form-control ${errors.employeeId ? "is-invalid" : ""}`}
          >
            <option value=""></option>
            {employees &&
              employees.map((employee) => (
                <option value={employee.id} key={employee.id}>
                  {employee.lastName}
                </option>
              ))}
          </select>
          <div className="invalid-feedback">{errors.employeeId?.message}</div>
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
        <Link href="/trainings" className="btn btn-link">
          Annuler
        </Link>
      </div>
    </form>
  );
}
