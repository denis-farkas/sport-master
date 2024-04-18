import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { horaireService } from 'services';

export default Index;

// page pour afficher la tables horaires
function Index() {
    const [horaires, setHoraires] = useState(null);
// recupere tout les horaires
    useEffect(() => {
        horaireService.getAll().then(x => setHoraires(x));
    }, []);

    function deleteHoraire(id) {
        setHoraires(horaires.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
       horaireService.delete(id).then(() => {
            setHoraires(horaires => horaires.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Horaires</h1>
            <Link href="/horaires/add" className="btn btn-sm btn-success mb-2">Ajouter un horaire</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th style={{ width: '13%' }}>Jour</th>
                        <th style={{ width: '15%' }}>debut matin</th>
                        <th style={{ width: '15%' }}>fin matin</th>
                        <th style={{ width: '15%' }}>debut aprés midi</th>
                        <th style={{ width: '15%' }}>fin aprés midi</th>
                        <th style={{ width: '15%' }}>fermeture matin</th>
                        <th style={{ width: '15%' }}>fermeture aprés midi</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {horaires && horaires.map(horaire =>
                        <tr key={horaire.id}>
                            <td>{horaire.jour}</td>
                          <td>{horaire.debut_matin}</td>
                          <td>{horaire.fin_matin}</td>
                          <td>{horaire.debut_apresmidi}</td>
                          <td>{horaire.fin_apresmidi}</td>
                          <td>{horaire.fermeture_matin}</td>
                          <td>{horaire.fermeture_apresmidi}</td>

                         
                           
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/horaires/edit/${horaire.id}`} className="btn btn-sm btn-primary me-1">Modifier</Link>
                                <button onClick={() => deleteHoraire(horaire.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={horaire.isDeleting}>
                                    {horaire.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Effacer</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {/* si horaire n exite pas affiche le spinner */}
                    {!horaires &&
                       ( <tr>
                       <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>)
                    }

                    {/* si horaire  exite et la longeur n exite pas alors n affiche pas les heures */}
                    {horaires && !horaires.length &&
                        (<tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Pas d&apos;horaires à afficher</div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </Layout>
    );
}