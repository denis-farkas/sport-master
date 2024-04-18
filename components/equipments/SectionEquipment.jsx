// fichier qui sert a ajouté les eequipments dans le

import { equipmentService } from "services";
import { useState, useEffect } from "react";

export { SectionEquipment };

// demande a l api a travers equipment service d envoyer la liste des eequipments
function SectionEquipment() {
  const [equipments, setEquipments] = useState(null);
  useEffect(() => {
    equipmentService.getAll().then((x) => setEquipments(x));
  }, []);

  return (
    <>
      <section>
        <div className="container mt-2">
          <ul className="list-unstyled smaller">
            {equipments &&
              equipments.map((equipment) => (
                <li key={equipment.id}>
                  <span className="fw-bold">{equipment.jour} :</span>
                  <span>
                    {equipment.fermeture_matin
                      ? "Fermé"
                      : ` ${equipment.debut_matin}  ${equipment.fin_matin}`}
                    -{" "}
                  </span>
                  <span>
                    {equipment.fermeture_apresmidi
                      ? "Fermé"
                      : ` ${equipment.debut_apresmidi}  ${equipment.fin_apresmidi}`}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}
