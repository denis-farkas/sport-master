import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Layout, AddEditSpace } from "components/spaces";
import { Spinner } from "components";
import { spaceService, alertService } from "services";

export default Edit;

// page pour modifier un espace
function Edit() {
  const router = useRouter();
  const [space, setSpace] = useState(null);

  // recupere l id dans le query du chemin
  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    // fetch space and set default form values if in edit mode
    spaceService
      .getById(id)
      .then((x) => setSpace(x))
      .catch(alertService.error);
  }, [router]);

  return (
    <Layout>
      <h1>Modifier l&apos;espace</h1>
      {/* si l horaire existe ajoute l'horaire sinon affiche le spinner */}
      {space ? <AddEditSpace space={space} /> : <Spinner />}
    </Layout>
  );
}
