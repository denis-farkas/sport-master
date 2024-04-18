import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEditEvent} from 'components/events';
import { Spinner } from 'components';
import { eventService, alertService } from 'services';

export default Edit;

function Edit() {
    const router = useRouter();
    const [event, setEvent] = useState(null);

    // recupere l id dans le query du chemin
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // fetch event and set default form values if in edit mode
        eventService.getById(id)
            .then(x => setEvent(x))
            .catch(alertService.error)
    }, [router]);

    return (
        <Layout>
            <h1>Modifier Evenement</h1>
            {event ? <AddEditEvent event={event} /> : <Spinner />}
        </Layout>
    );
}