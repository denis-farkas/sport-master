import { Layout, AddEditTraining } from "components/trainings";

export default Add;
// ajoute un horaire de l'admin
function Add() {
  return (
    <Layout>
      <h1>Ajouter un entrainement</h1>
      <AddEditTraining />
    </Layout>
  );
}
