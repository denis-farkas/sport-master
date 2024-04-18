import { Layout, AddEditHoraire } from 'components/horaires';

export default Add;
// ajoute un horaire de l'admin
function Add() {
    return (
        <Layout>
            <h1>Ajouter un Horaire</h1>
            <AddEditHoraire />
        </Layout>
    );
}