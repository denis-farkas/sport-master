import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEditontact } from 'components/contacts';
import { Spinner } from 'components';
import { contactService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [contact, setContact] = useState(null);

    // recupere l id dans le query du chemin
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch contact and set default form values if in edit mode
        contactService.getById(id)
            .then(x => setContact(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>Modifier Evenement</h1>
            {contact ? <AddEditontact contact={contact} /> : <Spinner />}
        </Layout>
    );
}