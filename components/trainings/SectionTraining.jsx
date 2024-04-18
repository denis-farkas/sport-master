import { trainingService, userService } from "services";
import { useState, useEffect } from "react";
import styles from "styles/article.module.css";
import ConditionalButton from "components/conditionnalButton";

export { SectionTraining };

function SectionTraining() {
  const [trainings, setTrainings] = useState(null);

  const [user, setUser] = useState(null);

  useEffect(() => {
    // s abonne a l'observable userservice a chaque mise a jour , le setter() met a jour l utilisateur
    trainingService.getAll().then((x) => setTrainings(x));
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <article>
        <div className={styles.actu}>
          <h2 className="text-center">ACTUALITÉS MPOWER GYM</h2>

          <p className="mt-3 text-center">DÉCOUVREZ NOS DERNIERS ARTICLES</p>
          <div className={styles.trait}></div>
        </div>
        {/* abonnement */}
        <div className="container mt-5 ">
          <div className="row justify-content-center gap-5 carteContainerAbonnement ">
            {trainings &&
              trainings.map((training) => {
                let props = { trainingId: training.id, user: user };
                return (
                  <div
                    className="cardTarifs col-xl-3 col-lg-4 col-md-5 col-sm-8 col-9 "
                    key={training.id}
                  >
                    <div className="typeAbonnement p-3">
                      <p className="m-0">{training.title}</p>
                    </div>
                    <div className="prixAbonnement pt-4">
                      <p className="fw-bold">
                        <span className="prix"> {training.price}€ </span> /4
                        semaines*
                      </p>
                    </div>
                    <div>
                      <p>
                        Les 4 premières semaines à{" "}
                        <span className="prixCarte">
                          {Math.round((training.price - 10) * 100) / 100}€
                        </span>
                      </p>
                    </div>
                    <div>
                      <p>Frais d&apos;adhésion de 25€</p>

                      <p>Plateforme tonicité et minceur</p>

                      <p>Un sac de sport offert</p>
                    </div>

                    <ConditionalButton props={props} />
                  </div>
                );
              })}
          </div>
        </div>
      </article>
    </>
  );
}
