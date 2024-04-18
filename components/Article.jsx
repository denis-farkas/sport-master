import React from "react";
import styles from "styles/article.module.css";
import Link from "next/link";

const Article = () => {
  return (
    <article>
      <div className={styles.actu}>
        <h2 className="text-center">ACTUALITÉS MPOWER GYM</h2>

        <p className="mt-3 text-center">DÉCOUVREZ NOS DERNIERS ARTICLES</p>
        <div className={styles.trait}></div>
      </div>
      <div className="container mt-5   ">
        <div className="row ">
          <div className="col-lg-4  ">
            <div className={styles.txtBas}>
              <img className="img-fluid" src=" img/food-1.jpg " alt="repas " />
              <div className={styles.separation}></div>
              <div className={styles.blocCard}>
                <h4 className={styles.titreBlog}>
                  COMMENT PERDRE DU POID RAPIDEMENT ?.
                </h4>
                <div className={styles.trait2}></div>
                <Link className={styles.liensArticle} href="/">
                  Lire la suite
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4  ">
            <div className={styles.txtBas}>
              <img className="img-fluid" src=" img/food-1.jpg " alt="repas " />
              <div className={styles.separation}></div>
              <div className={styles.blocCard}>
                <h4 className={styles.titreBlog}>
                  LA NUTRITION EST IMPORTANTE.
                </h4>
                <div className={styles.trait2}></div>
                <Link className={styles.liensArticle} href="/">
                  Lire la suite
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4  ">
            <div className={styles.txtBas}>
              <img className="img-fluid" src=" img/food-1.jpg " alt="repas " />
              <div className={styles.separation}></div>
              <div className={styles.blocCard}>
                <h4 className={styles.titreBlog}>COMPRENDRE SON CORPS.</h4>
                <div className={styles.trait2}></div>
                <Link className={styles.liensArticle} href="/">
                  Lire la suite
                </Link>
              </div>
            </div>
          </div>
        </div>
     
      </div>
      <div>

      </div>
    </article>
  );
};

export default Article;
