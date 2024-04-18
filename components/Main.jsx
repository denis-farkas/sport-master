import React from "react";
import styles from "styles/main.module.css";
import Link from "next/link";

const Main = () => {
  return (
    <main className={styles.menu}>
      <div className="container p-5  ">
        <div className="row pt-5  ">
          <div className=" col-lg-6 ">
            <div className="partieGauche mw-25">
              <h1>
                Donne Toi A fond et atteins
                <span className={styles.objectifsSport}>
                  {" "}
                  <br /> tes objectifs !{" "}
                </span>
              </h1>
              <p className="">Viens t&apos;entrainer au club Power Gym</p>
              <br />
              <p>
                Chez Mpower Gym, nous croyons que chaque pas vers la salle de
                sport est un pas vers une vie plus forte plus saine et plus
                vibrante
                <br />
                C&apos;est ici que vous trouverez la force intérieure pour
                surmonter les obstacles
                <br />
                le courage pour défier vos limites et l&apos;énergie pour
                conquérir vos rêves les plus fous.
              </p>
              <div className="btn1 mt-5">
                <Link href="/account/register">
                  {" "}
                  <button className={`btn  ${styles.btnPage}`}>
                    {" "}
                    S&apos;INSCRIRE CHEZ MPOWER GYM
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <img
              className="img-fluid"
              src="img/salle1.png"
              alt=" intérieur de la salle de sport"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
