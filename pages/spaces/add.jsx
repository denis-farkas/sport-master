import { Layout, AddEditSpace } from "components/spaces";

export default Add;
// ajoute un horaire de l'admin
function Add() {
  return (
    <Layout>
      <h1>Ajouter un espace</h1>
      <AddEditSpace />
    </Layout>
  );
}
