import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, AddEditTraining } from "components/trainings";
import { Spinner } from "components";
import { trainingService, alertService } from "services";

export default Edit;

// page pour modifier un etraining
function Edit() {
  const router = useRouter();
  const [training, setTrainings] = useState(null);

  // recupere l id dans le query du chemin
  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch training and set default form values if in edit mode
    trainingService
      .getById(id)
      .then((x) => setTrainings(x))
      .catch(alertService.error);
  }, [router]);

  return (
    <Layout>
      <h1>Modifier l&apos;entrainement</h1>
      {/* si l entrainement existe ajoute l'entrainement sinon affiche le spinner */}
      {training ? <AddEditTraining training={training} /> : <Spinner />}
    </Layout>
  );
}
