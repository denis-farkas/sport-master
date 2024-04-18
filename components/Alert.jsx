import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { alertService } from 'services';

export { Alert };

// // useRouter est un hook fourni par Next.js qui permet d'accéder à l'objet router. Cet objet router contient des informations sur l'URL actuelle et fournit des méthodes pour effectuer des opérations de navigation.

function Alert() {
    const router = useRouter();
    const [alert, setAlert] = useState(null);

    //  useEffect()hook est utilisé pour s'abonner à l'observable alertService.alert, cela permet au composant d'alerte d'être averti chaque fois qu'un message d'alerte est envoyé au service d'alerte.
    useEffect(() => {
        // subscribe to new alert notifications
        const subscription = alertService.alert.subscribe(alert => setAlert(alert));

        // se désabonner lorsque le composant est démonté
        return () => subscription.unsubscribe();
    }, []);

    // Le composant efface automatiquement l'alerte en cas de changement d'emplacement avec le deuxième useEffect()hook qui a une dépendance sur l' routerobjet.
    useEffect(() => {
        // efface l alerte
        alertService.clear();
    }, [router]);

    if (!alert) return null;

    return (
        <div className="container">
            <div className="m-3">
                <div className={`alert alert-dismissible ${alert.type}`}>
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => alertService.clear()}></button>
                </div>
            </div>
        </div>
    );
}
