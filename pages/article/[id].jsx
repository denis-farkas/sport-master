import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, ViewArticle } from "components/articles";
import { Spinner } from "components";
import { articleService, alertService } from "services";

// ce composant récupère l'ID de l'article à partir de l'URL, utilise ce paramètre pour récupérer les détails de l'article via le service, puis affiche les détails dans une mise en page (Layout). Si les détails ne sont pas encore chargés, un composant de chargement (Spinner) est affiché.
export default Article;

function Article() {
  const router = useRouter();
  const [article, setArticle] = useState(null);

  // recupere l id dans le query du chemin
  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch article and set default form values if in edit mode
    articleService
      .getById(id)
      .then((x) => setArticle(x))
      .catch(alertService.error);
  }, [router]);
 

      {/* remplacer le addeditarticle et creer un composant l'article en plein pages */}
      {if (article){
        return (
          <Layout>
        <>
        <h1>{article.title}</h1>
            <p>{article.content}</p>
            <img className="img-fluid" src={`/img/${article.image}`}  alt="repas "  />  
        </>
    </Layout>)
      } else {
        return(
        <Layout>
        <Spinner/>
        </Layout>
        )
      }}
}

