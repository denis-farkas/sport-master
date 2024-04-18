// fichier qui sert a ajouté les espaces dans le

import { spaceService } from "services";
import { useState, useEffect } from "react";

export { SectionSpace };

// demande a l api a travers space service d envoyer la liste des espaces
function SectionSpace() {
  const [spaces, setSpaces] = useState(null);
  useEffect(() => {
    spaceService.getAll().then((x) => setSpaces(x));
  }, []);

  return (
    <>
      <section>
        <div className="container mt-2">
          <ul className="list-unstyled smaller">
            {spaces &&
              spaces.map((space) => (
                <li key={space.id}>
                  <span className="fw-bold">{space.jour} :</span>
                  <span>
                    {space.fermeture_matin
                      ? "Fermé"
                      : ` ${space.debut_matin}  ${space.fin_matin}`}
                    -{" "}
                  </span>
                  <span>
                    {space.fermeture_apresmidi
                      ? "Fermé"
                      : ` ${space.debut_apresmidi}  ${space.fin_apresmidi}`}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
