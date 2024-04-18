import { articleService } from "services";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "styles/article.module.css";


export { SectionArticle };

function SectionArticle() {
  const [articles, setArticles] = useState(null);
  useEffect(() => {
    articleService.getVarious().then((x) => setArticles(x));
  }, []);

  return (
    <>
      <article>
        <div className={styles.actu}>
          <h2 className="text-center">ACTUALITÉS MPOWER GYM</h2>

          <p className="mt-3 text-center">DÉCOUVREZ NOS DERNIERS ARTICLES</p>
          <div className={styles.trait}></div>
        </div>
        <div className="container mt-5   ">
          <div className="row ">
            {articles &&
              articles.map((article) => (
                <div className="col-lg-4" key={article.id}>
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
            <div className="btn2 mt-2 ">
            <Link href="/articles/listeArticles">
             {" "}
            <button className="btnGlobal mt-2">
            Voir tous nos articles
           </button>
          </Link>
          </div>
        </div>
      </article>
    </>
  );
}