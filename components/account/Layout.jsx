import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { userService } from 'services';

export { Layout };

// contient le code commun pour toutes les pages du /pages/account du dossier
function Layout({ children }) {
    const router = useRouter();
// si l utilisateur est connecter on le renvoie  a la page home
    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    return (
        <div className="col-md-6 offset-md-3 mt-5">
            {children}
        </div>
    );
}