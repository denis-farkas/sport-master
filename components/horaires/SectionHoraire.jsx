// fichier qui sert a ajouté les horaires dans le footer

import { horaireService } from "services";
import { useState, useEffect } from "react";

export { SectionHoraire };

// demande a l api a travers horaire service d envoyer la liste des horaires
function SectionHoraire() {
  const [horaires, setHoraires] = useState(null);
  useEffect(() => {
    horaireService.getAll().then((x) => setHoraires(x));
  }, []);
  if (horaires) {
    return (
      <>
        <section>
          <div className="container mt-2">
            <ul className="list-unstyled smaller">
              {horaires &&
                horaires.map((horaire) => (
                  <li key={horaire.id}>
                    <span className="fw-bold">{horaire.jour} :</span>
                    <span>
                      {horaire.fermeture_matin
                        ? "Fermé"
                        : ` ${horaire.debut_matin}  ${horaire.fin_matin}`}
                      -{" "}
                    </span>
                    <span>
                      {horaire.fermeture_apresmidi
                        ? "Fermé"
                        : ` ${horaire.debut_apresmidi}  ${horaire.fin_apresmidi}`}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </>
    );
  }
}
