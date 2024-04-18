import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// l utilisateur peut ajouter un horaire

import { horaireService, alertService } from 'services';
// composant AddEdit est utilisé à la fois pour ajouter et modifier des utilisateurs, il contient un formulaire construit avec la bibliothèque React Hook Form et est utilisé par la page d'ajout d'utilisateur et la page de modification d'utilisateur .

export { AddEditHoraire };

function AddEditHoraire(props) {
    const horaire = props?.horaire;
    const router = useRouter();

    // Les règles de validation de formulaire sont définies avec la bibliothèque de validation de schéma Yup et transmises avec la fonction formOptionsReact Hook Form useForm()
    // form validation rules 
    const validationSchema = Yup.object().shape({
        jour: Yup.string()
         .required('Un contenu est requis'),
     
 
        
     });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // set default form values if in edit mode
    if (horaire) {
        formOptions.defaultValues = props.horaire;
    }

    // get functions to build form with useForm() hook
    // La useForm()fonction hook renvoie un objet avec des méthodes pour travailler avec un formulaire, notamment l'enregistrement des entrées, la gestion de la soumission du formulaire, la réinitialisation du formulaire, l'accès à l'état du formulaire, l'affichage des erreurs et plus encore
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    // La onSubmitfonction est appelée lorsque le formulaire est soumis et valide, et crée ou met à jour un utilisateur en fonction du mode dans lequel il se trouve.

    async function onSubmit(data) {
        alertService.clear();
        try {
            // create or update horaire based on horaire prop
            let message;
            if (horaire) {
                await horaireService.update(horaire.id, data);
                message = 'horaire modifié';
            } else {
                await horaireService.register(data);
                message = 'horaire ajouté';
            }

            // redirect to user list with success message
            router.push('/horaires');
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
                    <label className="form-label">Jour</label>
                    <input name="Jour" type="text" {...register('jour')} className={`form-control ${errors.jour ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.jour?.message}</div>
                </div>
                </div>
                <div className="row">

                <div className="mb-3 col">
                    <label className="form-label">debut matin</label>
                    <input
                    name="debut_matin"
                    {...register("debut_matin")}
                    className={`form-control ${errors.debut_matin ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.debut_matin?.message}</div>
                </div>
                <div className="mb-3 col">
                    <label className="form-label">fin matin</label>
                    <input name="fin_matin" type="text" {...register('fin_matin')} className={`form-control ${errors.fin_matin ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.fin_matin?.message}</div>
                </div>
                </div>
           
            <div className="row">
            
            <div className="mb-3 col">
                    <label className="form-label">debut apres midi</label>
                    <input
                    name="debut_apresmidi" type='text'
                    {...register("debut_apresmidi")}
                    className={`form-control ${errors.debut_apresmidi ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.debut_apresmidi?.message}</div>
                </div>
            <div className="mb-3 col">
                    <label className="form-label">fin apres midi</label>
                    <input
                    name="fin_apresmidi"
                    {...register("fin_apresmidi")}
                    className={`form-control ${errors.fin_apresmidi ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.fin_apresmidi?.message}</div>
                </div>
           </div>   
           <div className="row"> 
            <div className="mb-3 col">
                    <label className="form-label">fermeture matin</label>
                    <input
                    name="fermeture_matin"
                    {...register("fermeture_matin")}
                    className={`form-control ${errors.fermeture_matin ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.fermeture_matin?.message}</div>
                </div>
            <div className="mb-3 col">
                    <label className="form-label"> fermeture apres midi</label>
                    <input
                    name="fermeture_apresmidi"
                    {...register("fermeture_apresmidi")}
                    className={`form-control ${errors.apresmidi ? "is-invalid" : ""}`}
                    />
                    <div className="invalid-feedback">{errors.apresmidi?.message}</div>
                </div>
       </div>
            <div className="mb-3">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary me-2">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Enregistrer
                </button>
                <button onClick={() => reset(formOptions.defaultValues)} type="button" disabled={formState.isSubmitting} className="btn btn-secondary">Reset</button>
                <Link href="/horaires" className="btn btn-link">Annuler</Link>
            </div>
        </form>
    );
}