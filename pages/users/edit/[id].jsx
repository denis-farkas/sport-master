import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEdit } from 'components/users';
import { Spinner } from 'components';
import { userService, alertService } from 'services';
// édition d'un utilisateur. utilise useRouter pour obtenir l'ID de l'URL, le hook useEffect pour effectuer des opérations asynchrones lors du rendu initial, et des composants comme AddEdit et 
export default Edit;

function Edit() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    // useeffect pour des operations apres le rendu du composant, il recupere l'id de l'url grace a router.query et
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch user and set default form values if in edit mode
        //  utilise userservice pour obtenir les details de l utilisateur associé a cette id
        userService.getById(id)
        // stocke les données dans le state
            .then(x => setUser(x))
            .catch(alertService.error)
    }, [router]);

    // Le composant est rendu dans la balise Layout. Si les données de l'utilisateur sont disponibles (user existe), le composant AddEdit est rendu avec les données de l'utilisateur. Sinon, un composant Spinner est rendu pour indiquer un chargement en cours.
    return (
        <Layout>
            <h1>Modifier un utilisateur</h1>
            {user ? <AddEdit user={user} /> : <Spinner />}
        </Layout>
    );
}