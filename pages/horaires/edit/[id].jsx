import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEditHoraire } from 'components/horaires';
import { Spinner } from 'components';
import { horaireService, alertService } from 'services';

export default Edit;

// page pour modifier un horaire
function Edit() {
    const router = useRouter();
    const [horaire, setHoraire] = useState(null);

    // recupere l id dans le query du chemin
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch horaire and set default form values if in edit mode
        horaireService.getById(id)
            .then(x => setHoraire(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>Modifier Horaire</h1>
            {/* si l horaire existe ajoute l'horaire sinon affiche le spinner */}
            {horaire ? <AddEditHoraire horaire={horaire} /> : <Spinner />}
        </Layout>
    );
}