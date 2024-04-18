import React from "react";
import styles from "styles/section.module.css";
import Link from "next/link";

const Section = () => {
  return (
    <section>
      <div className="container p-5 d-flex align-items-center">
        <div className="row">
          <div className="col-lg-6">
            <div className="imgGauche">
              <img
                className="img-fluid sportifEntrainement"
                src="/img/perso-focus.jpg"
                alt="sportif qui s'entraine"
              />
            </div>
          </div>

          {/* partie droite */}
          <div className="col-lg-6 ">
            <div className="ptexte p-5">
              <h2>
                Mpower gym <br /> Club de Sport
              </h2>

              <div className="texteDroite mt-4">
                <p>
                  {" "}
                  <span className={styles.texteGras}>
                    {" "}
                    Que vous soyez un débutant{" "}
                  </span>
                  cherchant à prendre un nouveau départ ou un athlète chevronné
                  en quête de défis, Mpower Gym vous offre un terrain
                  d&apos;entraînement sans limites. Notre équipe d&apos;experts
                  passionnés est là pour vous guider, vous soutenir et vous
                  encourager à chaque étape de votre parcours.
                </p>

                <p>
                  Dans notre salle de sport, nous ne vendons pas seulement des
                  adhésions, nous offrons un voyage vers une meilleure version
                  de vous-même. Chaque goutte de sueur, chaque série
                  d&apos;exercices et chaque effort que vous investissez vous
                  rapprochent de vos rêves les plus audacieux.
                </p>

                <p>
                  Notre environnement n&apos;est pas simplement un lieu
                  d&apos;entraînement, mais un laboratoire où se forgent la
                  résilience, la force intérieure et la confiance en soi. Chaque
                  séance d&apos;entraînement est une opportunité de transcender
                  les limites perçues, de repousser les barrières physiques et
                  mentales, et de vous propulser vers des hauteurs que vous
                  n&apos;auriez peut-être jamais imaginées.
                </p>

                <p>
                  Nous croyons en la puissance transformative du fitness, non
                  seulement pour sculpter votre corps, mais aussi pour nourrir
                  votre esprit. Notre équipe dévouée de professionnels de la
                  santé et de coachs personnels est là pour guider chaque étape
                  de votre parcours, assurant ainsi que chaque mouvement est
                  fait avec précision et chaque objectif est atteint avec
                  détermination.
                </p>
              </div>

              <div className="btn2 ">
                <Link href="/contacts/add">
                  {" "}
                  <button className="btnGlobal mt-2">
                    RÉSERVE TA SÉANCE D&apos;ESSAI
                    <br />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section;
