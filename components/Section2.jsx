import React from "react";
import styles from "styles/section2.module.css";

const Section2 = () => {
  return (
    <section className={`container-fluid mt-5 pb-5 ${styles.couleurFond}`}>
      <div>
        <h2 className={`pt-5 text-center ${styles.titrePage}`}>
          RELÂCHEZ LA PRESSION CHEZ MPOWER GYM
        </h2>
        <div className={styles.trait}></div>

        <p className="text-center mt-3">
          Lorsque vous entrez dans nos locaux, laissez vos doutes à la porte et
          enfilez votre détermination. Chaque séance d&apos;entraînement est une
          opportunité de vous dépasser, de dépasser vos propres attentes et de
          devenir la meilleure version de vous-même. Les résultats ne viennent
          pas du confort, mais de la résistance que vous choisissez de
          surmonter.
        </p>
        <h2 className={` text-center mt-5 ${styles.titrePage}`}>
          VOTRE CLUB DE MUSCULATION ET DE FITNESS
        </h2>
        <div className={styles.trait}></div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              <div className="partieGauche">
                <h3>UN COMPLEXE SPORTIF</h3>
                <div className={styles.trait2}></div>
                <p className="lh-lg">
                  Alors, êtes-vous prêt à vous engager dans ce voyage excitant ?
                  Relevez le défi, repoussez les limites et découvrez le pouvoir
                  qui sommeille en vous. Rejoignez-nous dans notre salle de
                  sport, où les rêves deviennent des réalités et où la
                  persévérance construit des destins.
                  <br />
                  <br />
                  Mpower Gym ne se limite pas uniquement à l&apos;effort
                  physique. L&apos;espace de récupération est conçu pour
                  favoriser la détente après l&apos;entraînement, avec des
                  saunas et des espaces de relaxation. Des séances de méditation
                  et de yoga sont également organisées pour aider les membres à
                  relâcher les tensions et à cultiver la tranquillité
                  d&apos;esprit.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="partieDroite">
                <img
                  className="img-fluid"
                  src="img/sportif-Corde1.jpg"
                  alt="sportif qui s'entraine"
                />
              </div>
            </div>
            {/* part 2  */}
          </div>
        </div>
        <div className="d-flex container mt-5">
          <div className="row">
            <div className={`col-lg-6 order-2 ${styles.TextGauche}`}>
              <div className="partieGauche ">
                <h3>DES ÉQUIPEMENTS MODERNES</h3>
                <div className={styles.trait2}></div>
                <p className="lh-lg mt-3">
                  Une salle de sport et de remise en forme se définit aussi pour
                  son équipement et l&apos;espace dans lequel on travaille ses
                  muscles.
                  <br />
                  Le complexe sportif Mpower Gym met à votre disposition des
                  équipements de sports dernier cri qui vont booster votre
                  motivation et qui vont vous faire aimer faire du sport.
                  <br />
                  Les tapis roulants dotés de systèmes interactifs vous
                  immergent dans des parcours virtuels, vous transportant dans
                  des environnements inspirants tout en mesurant votre
                  performance. Les machines de musculation de dernière
                  génération sont ergonomiques et ajustables, permettant un
                  ciblage précis des groupes musculaires. Au-delà de
                  l&apos;équipement de qualité, l&apos;espace de notre salle de
                  sport est pensé pour créer une atmosphère motivante et
                  stimulante.
                </p>
              </div>
            </div>
            <div className={`col-lg-6 order-1 ${styles.imgDroiteSportif}`}>
              <div className="partieDroite ">
                <img
                  className="img-fluid"
                  src="img/halteres.png"
                  alt="sportif qui s'entraine"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6">
              <div className="partieGauche">
                <h3>UN ESPACE PROFESSIONNEL</h3>
                <div className={styles.trait2}></div>
                <p className="lh-lg mt-3">
                  Que vous ayez besoin de vous remettre en forme, de perdre du
                  poids, de pratiquer du sport régulièrement ou de reprendre
                  confiance en vous, Mpower Gym et ses membres vous attendent
                  pour passer de bons moments bénéfiques à votre corps et à
                  votre esprit ! Nous faisons de chacune de nos séances
                  sportives un moment d&apos;échanges, de bienveillance et de
                  motivation pour donner le meilleur de nous et de vous !
                  <br />
                  Cet espace professionnel constitue une source
                  d&apos;informations et de conseils complets pour les membres,
                  favorisant ainsi leur engagement et leur réussite à long
                  terme. Nous mettons à votre disposition non seulement des
                  équipements de pointe, mais également une richesse
                  d&apos;informations et de conseils personnalisés. Chaque coin
                  de notre salle est conçu pour inspirer, informer et guider nos
                  membres sur le chemin de la réussite à long terme.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="partieDroite">
                <img
                  className="img-fluid"
                  src="img/sportif-5-grand-format.jpg"
                  alt="sportif qui s'entraine"
                />
              </div>
            </div>
            {/* part 2  */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
