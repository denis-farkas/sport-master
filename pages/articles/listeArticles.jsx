import { articleService } from "services";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "styles/article.module.css";
import { userService } from "services";

// page article dans la page d'accueil

export default ListeArticles ;
function ListeArticles() {
// stocke les articles il est dabord initialisé a null
  const [articles, setArticles] = useState(null);

  const [user, setUser] = useState(null);
//  sexécute apres le premier rendu du composant avec le [ tableau de dependance vide] utilisation de articleService  pour recuperer tout les articles utilisation de la fonction setArticles() pour mettre à jour l 'etat avec les articles a l interieur

  useEffect(() => {
    articleService.getAll().then((x) => setArticles(x));
    // s'abonne au mise a jour de l 'utilisateur en utilisant userService.user.subscribe().lorsque l'utilisateur change, la fonction setUser est utilisée pour mettre à jour l'état user.
    const subscription = userService.user.subscribe((x) => setUser(x));
    // La fonction de retour de useEffect sert à se désabonner des mises à jour de l'utilisateur lorsque le composant est démonté.
    return () => subscription.unsubscribe();
  }, []);

  // si l utilisateur est connecter affiche les articles sinon dis lui de se connecter
  return (
      <>
    { user  ? ( 
      <div className="mb-3">
        <div className={styles.actu}>
          <h2 className="text-center">ACTUALITÉS MPOWER GYM</h2>

          <p className="mt-3 text-center">DÉCOUVREZ NOS  ARTICLES</p>
          <div className={styles.trait}></div>
        </div>
        <div className="container mt-5   ">
          <div className="row ">
            {articles &&
              articles.map((article) => (
                <div className="col-lg-4 mt-3" key={article.id}>
                  <div className={styles.txtBas}>
                  <img
                      className="img-fluid"
                      src={`/img/${article.image}`}
                      alt="repas "
                    />
                    <div className={styles.separation}></div>
                    <div className={styles.blocCard}>
                      <h4 className={styles.titreBlog}>{article.title}</h4>
                      <div className={styles.trait2}></div>
                      <Link
                        className={styles.liensArticle}
                        href={`/article/${article.id}`}
                      >
                        Lire la suite
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    ) : (
        <>
            <p>Vous devez être connecté pour accéder à nos articles</p>
        </>
    )}
    </>

  );
}