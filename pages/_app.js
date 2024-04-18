import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Script from 'next/script';

import 'styles/globals.css';

import { userService } from 'services';
import { Nav, Alert } from 'components';
import Header from 'components/Header';
import Footer from 'components/Footer';

// le fichier app permet de créer toutes les pages du site
export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    // au depart l'utilisateur nest pas connecte
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // lors du chargement initial - exécuter la vérification d'authentification
        authCheck(router.asPath);

        // au début du changement d'itinéraire - masquer le contenu de la page en définissant autorisé sur faux 
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // vérification d'authentification
        router.events.on('routeChangeComplete', authCheck)

        // se désabonner des événements dans la fonction de retour useEffect
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }
    }, []);

    function authCheck(url) {

        setUser(userService.userValue);
        // toute les pages que peut visiter l'utilisateur sans  etre connecter
        const publicPaths = ['/account/login', '/account/register', '/', '/monclub', '/abonnement'];
        const path = url.split('?')[0];
        // Si l'utilisateur n'est pas connecté et que la page actuelle n'est pas publique
        // dans le cas contraire il renvoie true
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            // redirection vers la page connexion
            router.push({
                pathname: '/account/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }
// toutes les pages viennent dans component at sont soumis a l 'authorisation
    return (
        <>
            <Head>
                <title>Mpower Gym</title>
                
            </Head>

                <Header />
            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Alert />
                  <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"/>
                {authorized &&
                    <Component {...pageProps} />
                }
            </div>
                <Footer />
        </>
    );
}