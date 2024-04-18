//l asynchrone est que le code s execute pendant q'une ou plusieur requetes sont en cours

// L’AJAX est une technologie permettant de mettre à jour simplement des parties du DOM d'une page HTML au lieu de devoir recharger la page entière. 

// AJAX permet également d’exécuter du code de manière asynchrone, c'est-à-dire que votre code continue à s'exécuter pendant qu’une ou plusieurs requêtes sont en cours.

// fetch est une web api qui permet d envoyer des requetes http

let pathWith = path.split("/");
    if (pathWith.length > 3) {
      path = "/" + pathWith[1] + "/" + pathWith[2];
    }

    // mettre en dessous de const path dans _app (attention const path devient let path)

    // à mettre dans helpers/api/jwt-middleware dans la variable path
    { url: /^\/api\/projets\/.*/, methods: ["GET"] },

    import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import isEmailValidator from "validator/lib/isEmail";
import { Layout } from 'components/account';
import { userService, alertService } from 'services';

export default Register;

function Register() {
    const router = useRouter();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Le prenom est requis'),
        lastName: Yup.string()
            .required('Le nom est requis'),
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
            .required('le mot de passe est requis')
            .min(6, 'Le mot de passe doit contenir 6 caractères')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {
                alertService.success('Inscription reussie', true);
                router.push('login');
            })
            .catch(alertService.error);
    }

    return (
        <Layout>
            <div className="card mb-5">
                <h4 className="card-header">Inscription</h4>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label className="form-label">Prenom</label>
                            <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.firstName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nom</label>
                            <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastName?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.email?.message}</div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        <button disabled={formState.isSubmitting} className="btn btnInscription">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Inscription
                        </button>
                        <Link href="/account/login" className="btn btn-link">Annuler</Link>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

// mot de passe pour kent : Weshkent@kent10
// abonnement 
<>
<div className="cardTarifs col-lg-4    ">
<div className="typeAbonnement p-3">
  <p className="m-0">Classic</p>
</div>
<div className="prixAbonnement pt-4">
  <p className="fw-bold">
    <span className="prix"> 29.99€ </span> /4 semaines*
  </p>
</div>
<div>
  <p>
    Les 4 premières semaines à{" "}
    <span className="prixCarte">19€</span>{" "}
  </p>
</div>
<div>
  <p>Frais d&apos;adhésion de 25€</p>

  <p>Plateforme tonicité et minceur</p>

  <p>Un sac de sport offert</p>
</div>
{user ? (
  <button>S&apos;abonner</button>
) : (
  <button>S&apos;inscrire</button>
)}
</div>
          <div className="cardTarifs col-lg-4   ">
            <div className="typeAbonnement p-3 ">
              <p className="m-0">essentiel </p>
            </div>
            <div className="prixAbonnement pt-4">
              <p className="fw-bold">
                <span className="prix"> 35.99€ </span> /4 semaines*
              </p>
            </div>
            <div>
              <p>
                Les 4 premières semaines à{" "}
                <span className="prixCarte">19€</span>{" "}
              </p>
            </div>
            <div>
              <p>Frais d&apos;adhésion de 25€</p>

              <p>Plateforme tonicité et minceur</p>

              <p>Suivi des Progrès</p>

              <p>Balance d&apos;analyse corporelle</p>

              <p>Un sac de sport offert</p>
            </div>
          </div>
          <div className="cardTarifs col-lg-4   ">
            <div className="typeAbonnement p-3">
              <p className="m-0">Premium </p>
            </div>
            <div className="prixAbonnement pt-4">
              <p className="fw-bold">
                <span className="prix"> 40.99€ </span> /4 semaines*
              </p>
            </div>
            <div>
              <p>
                Les 4 premières semaines à{" "}
                <span className="prixCarte">19€</span>{" "}
              </p>
            </div>
            <div>
              <p>Frais d&apos;adhésion de 25€</p>

              <p>Plateforme tonicité et minceur</p>
              <p>Balance d&apos;analyse corporelle</p>
              <p>Coaching en ligne</p>
              <p>Entraînement avec un invité</p>
              <p></p>
              <p></p>
            </div>
          </div>
          </>