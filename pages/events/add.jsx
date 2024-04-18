import { Layout, AddEditEvent } from 'components/events';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Ajouter un Evenement</h1>
            <AddEditEvent />
        </Layout>
    );
}