import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Layout, AddEditArticle } from 'components/articles';
import { Spinner } from 'components';
import { articleService, alertService } from 'services';

// ce composant récupère l'ID de l'article à partir de l'URL, utilise ce paramètre pour récupérer les détails de l'article via le service, puis affiche soit le formulaire de modification d'article (AddEditArticle), soit un composant de chargement (Spinner).
export default Edit;
// gere la modification de l article dans le dashboard
function Edit() {
    const router = useRouter();
    const [article, setArticle] = useState(null);

    // recupere l id dans le query du chemin si l id nest pas present sa se stop
    useEffect(() => {
        const { id } = router.query;
        if (!id) return;

        // appelle articleService.getById(id) pour récupérer les informations de l'article à partir du service. Si la récupération est réussie, il met à jour l'état avec les informations de l'article. Sinon, il affiche une alerte d'erreur à l'aide du service d'alerte.
        articleService.getById(id)
            .then(x => setArticle(x))
            .catch(alertService.error)
    }, [router]);

    // si article existe affiche sinon affiche le spinner
    return (
        <Layout>
            <h1>Modifier Article</h1>
            {article ? <AddEditArticle article={article} /> : <Spinner />}
        </Layout>
    );
}