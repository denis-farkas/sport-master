import Link from 'next/link';
import { useState, useEffect } from 'react';

import { Spinner } from 'components';
import { Layout } from 'components/users';
import { articleService } from 'services';

// affiche les articles dans le dashboard
export default Index;

function Index() {
    const [articles, setArticles] = useState(null);
// apres le rendu du composant appele le service pour recupere tout les articles et les stocke dans l etat local setArticle
    useEffect(() => {
        articleService.getAll().then(x => setArticles(x));
    }, []);

    // 
    function deleteArticle(id) {
        // utilisation de setArticle pour mettre à jour l etat locl des articles, utilisation de map qui cree un nouveau tableau darticle en marquant l'article correspondant à l'ID donné comme étant en cours de suppression (isDeleting est défini sur true).
        setArticles(articles.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        // utilisation d'articleService pour envoyer une requete de suppression a l 'api backend ensuite on utilise setArticles pour mettre à jour l'état local des articles. On filtre l'article supprimé en fonction de son ID, ce qui a pour effet de le retirer du tableau d'articles.
       articleService.delete(id).then(() => {
            setArticles(articles => articles.filter(x => x.id !== id));
        });
    }

    return (
        <Layout>
            <h1>Articles</h1>
            <Link href="/articles/add" className="btn btn-sm btn-success mb-2">Ajouter un article</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Titre</th>
                        <th style={{ width: '30%' }}>Contenu</th>
                        <th style={{ width: '30%' }}>Image</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                {/* utilisation de map pour retourner un element de tableau pour chaque article: le key est une clé unique definie par l'id de l'article , les clé aident react a identifier quel element a changé, ajouté ou supprimer */}
                    {articles && articles.map(article =>
                        <tr key={article.id}>
                            <td>{article.title}</td>
                          

                            <td > <p> {article.content}</p></td>
                           
                            <td>{article.image}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/articles/edit/${article.id}`} className="btn btn-sm btn-primary me-1">Modifier</Link>
                                <button onClick={() => deleteArticle(article.id)} className="btn btn-sm btn-danger btn-delete-user" style={{ width: '60px' }} disabled={article.isDeleting}>
                                    {article.isDeleting
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Effacer</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {/* si article est null affiche le l animation spinner */}
                    {!articles &&
                       ( <tr>
                            <td colSpan="4">
                                <Spinner />
                            </td>
                        </tr>)
                    }
                    {/* Si articles existe mais est vide, cela affiche une ligne indiquant qu'il n'y a pas d'articles à afficher. */}
                    {articles && !articles.length &&
                        (<tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">Pas d&apos;articles à afficher</div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </Layout>
    );
}