import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { eventService } from 'services';

export default Index;

function Index() {
    const [events, setEvents] = useState(null);
// recupere tout les utilisateurs
    useEffect(() => {
        eventService.getAll().then((x) => setEvents(x));
        // console.log(events[0]);
    }, []);

    function deleteEvent(id) {
        setEvents(events.map((x )=> {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
       eventService.delete(id).then(() => {
            setEvents(events => events.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Evenement</h1>
            <Link href="/events/add" className="btn btn-sm btn-success mb-2">Ajouter un evenement</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '22.5%' }}>Titre</th>
                        <th style={{ width: '22.5%' }}>Contenu</th>
                        <th style={{ width: '22.5%' }}>Image</th>
                        <th style={{ width: '22.5%' }}>Lieu, horaire</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.map(event =>
                        <tr key={event.id}>
                            <td>{event.title}</td>
                          

                            <td > <p> {event.description}</p></td>
                           
                            <td>{event.image}</td>
                            <td>{event.rdv}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/events/edit/${event.id}`} className="btn btn-sm btn-primary me-1">Modifier</Link>
                                <button onClick={() => deleteEvent(event.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={event.isDeleting}>
                                    {event.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Effacer</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!events &&
                       ( <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>)
                    }
                    {events && !events.length &&
                        (<tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Pas d&apos;evenement à afficher</div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </Layout>
    );
}
