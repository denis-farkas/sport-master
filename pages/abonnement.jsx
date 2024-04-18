import { useState, useEffect } from "react";
import { SectionTraining } from "components/trainings";
import styles from "styles/article.module.css";

const Abonnement = () => {
  return (
    <>
      <div className="container  pageAbonnement">
        {" "}
        <h1 className="titreAbonnement text-center">
          {" "}
          TROUVE FACILEMENT L&apos;ABONNEMENT QUI TE CONVIENT.
        </h1>
        <p className="txtAbonnement text-center pt-4">
          En devenant membre de Mpower Gym, vous bénéficiez d&apos;un accès
          illimité à nos installations modernes et ultramodernes. Des
          équipements dernier cri aux espaces d&apos;entraînement spécialement
          conçus, notre salle de sport offre tout ce dont vous avez besoin pour
          atteindre vos objectifs de fitness.
        </p>
        <h2 className="pt-5 text-center">NOS OFFRES AVEC ENGAGEMENT</h2>
      </div>

      <div className="cardAbonnement container  ">
        <div className=" carteAbonnement d-flex text-center  justify-content-center ">
          <SectionTraining />
          {/*  */}
        </div>
      </div>

      <div className="container pb-5">
        <h2 className="text-center pb-3">
          {" "}
          FAÇONNE TES ENTRAÎNEMENTS SELON TES ENVIES.
        </h2>
        <div className="trait"></div>
        <p className=" text-center pt-4 pb-4">
          En tant que membre, vous avez accès à des experts en fitness et en
          nutrition qui sont déterminés à vous aider à réussir. Bénéficiez de
          séances d&apos;entraînement personnalisées, de conseils nutritionnels
          avisés et de suivis réguliers pour maximiser vos résultats.
        </p>
        {/* img */}
        <div className="container d-flex justify-content-center">
          <div className="imgGroupe w-75   ">
            <img className="img-fluid " src="/img/article1.jpg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Abonnement;
