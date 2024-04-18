import React from "react";
import { SectionEvent } from "components/events";

const monclub = () => {
  return (
    <>
      <div className="container blocClub ">
        <div className="row d-flex ">
          <h1 className="pb-5">
            {" "}
            Cours en Plein Air : Fitness à la Lumière du Jour !
          </h1>
          <div className=" ">
            <img
              src="img/sportenGroupe (1).jpg"
              alt="cours collectif"
              className="img-fluid"
            />
          </div>
          <h2 className=" pt-5 ">Chers passionnés de fitness</h2>
          <p className="ClubText pt-2  ">
            <span className="textFitness"> Venez nous rejoindre </span> alors
            que nous apportons l&apos;enthousiasme et la vitalité de Mpower Gym
            en plein air. Nos séances d&apos;entraînement en plein air sont
            conçues pour vous offrir une nouvelle perspective sur le fitness et
            vous reconnecter avec la nature tout en transpirant et en vous
            amusant. <br />
            <br />
            <span className="textFitness">Sous le ciel ouvert, </span> vous
            serez guidé par nos instructeurs dévoués à travers des séquences
            dynamiques d&apos;exercices cardio, de renforcement musculaire et de
            mouvementsfonctionnels.
            <br /> L&apos;herbe sous vos pieds et le soleil sur votre visage
            ajouteront une dimension rafraîchissante à votre routine habituelle.
            <br />
            <br />
            <span className="textFitness px-2 ">
              Que vous soyez un adepte du jogging
            </span>
            un amateur de HIIT ou simplement à la recherche d&apos;une manière
            amusante de rester actif, nos Cours en Plein Air sont adaptés à tous
            les niveaux de forme physique. Peu importe votre expérience,
            préparez-vous à vous sentir revitalisé et à vivre une expérience
            d&apos;entraînement mémorable.
            <br />
            <br />
            <span className="textFitness">Apportez votre sourire </span>
            : votre bouteille d&apos;eau et votre motivation pour rejoindre la
            communauté Mpower dans une aventure fitness qui vous emmènera hors
            des sentiers battus. Les Cours en Plein Air sont également une
            excellente occasion de rencontrer d&apos;autres membres, de partager
            des objectifs et de créer des souvenirs ensemble.
            <br />
            <br />
            <span className="textFitness">
              préparez-vous à vous entraîner{" "}
            </span>{" "}
            ans un environnement inspirant où le ciel est la limite. Faites un
            pas vers le bien-être et rejoignez-nous pour des Cours en Plein Air
            qui font vibrer le corps et l&apos;esprit.
            <br />
            <br />
            <span className="textFitness">
              Offres spéciales d&apos;inscription{" "}
            </span>{" "}
            Nous avons hâte de vous voir prendre de l&apos;élan sous le soleil
            radieux !
            <br />
            <br />
            Avec enthousiasme, L&apos;équipe Mpower Gym.{" "}
          </p>

          <SectionEvent />
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default monclub;
