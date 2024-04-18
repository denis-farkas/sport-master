import { Layout, AddEditEquipment } from "components/equipments";

export default Add;
// ajoute un horaire de l'admin
function Add() {
  return (
    <Layout>
      <h1>Ajouter un equipement</h1>
      <AddEditEquipment />
    </Layout>
  );
}
