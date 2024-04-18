import Link from "next/link";
import { useState, useEffect } from "react";

import { Spinner } from "components";
import { Layout } from "components/users";
import { equipmentService } from "services";

export default Index;

// page pour afficher la tables equipments
function Index() {
  const [equipments, setEquipments] = useState(null);
  // recupere tout les equipments
  useEffect(() => {
    equipmentService.getAll().then((x) => setEquipments(x));
  }, []);

  function deleteEquipment(id) {
    setEquipments(
      equipments.map((x) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    equipmentService.delete(id).then(() => {
      setEquipments((equipments) => equipments.filter((x) => x.id !== id));
    });
  }

  return (
    <Layout>
      <h1>Eequipments</h1>
      <Link href="/equipments/add" className="btn btn-sm btn-success mb-2">
        Ajouter un eequipment
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Id</th>
            <th style={{ width: "40%" }}>Nom</th>
            <th style={{ width: "20%" }}></th>
          </tr>
        </thead>
        <tbody>
          {equipments &&
            equipments.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.id}</td>
                <td>{equipment.name}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={`/equipments/edit/${equipment.id}`}
                    className="btn btn-sm btn-primary me-1"
                  >
                    Modifier
                  </Link>
                  <button
                    onClick={() => deleteSpace(equipment.id)}
                    className="btn btn-sm btn-danger btn-delete-user"
                    style={{ width: "60px" }}
                    disabled={equipment.isDeleting}
                  >
                    {equipment.isDeleting ? (
                      <span className="spinner-border spinner-border-sm"></span>
                    ) : (
                      <span>Effacer</span>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          {/* si equipment n exite pas affiche le spinner */}
          {!equipments && (
            <tr>
              <td colSpan="4">
                <Spinner />
              </td>
            </tr>
          )}

          {/* si equipment  exite et la longeur n exite pas alors n affiche pas les heures */}
          {equipments && !equipments.length && (
            <tr>
              <td colSpan="4" className="text-center">
                <div className="p-2">Pas d&apos;equipments à afficher</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
