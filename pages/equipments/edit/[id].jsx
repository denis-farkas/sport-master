import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, AddEditEquipment } from "components/equipments";
import { Spinner } from "components";
import { equipmentService, alertService } from "services";

export default Edit;

// page pour modifier un espace
function Edit() {
  const router = useRouter();
  const [equipment, setEquipment] = useState(null);

  // recupere l id dans le query du chemin
  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch space and set default form values if in edit mode
    equipmentService
      .getById(id)
      .then((x) => setEquipment(x))
      .catch(alertService.error);
  }, [router]);

  return (
    <Layout>
      <h1>Modifier l&apos;equipement</h1>
      {/* si l horaire existe ajoute l'horaire sinon affiche le spinner */}
      {equipment ? <AddEditEquipment equipment={equipment} /> : <Spinner />}
    </Layout>
  );
}
