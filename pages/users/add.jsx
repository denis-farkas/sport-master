import { Layout, AddEdit } from 'components/users';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Ajouter membre</h1>
            <AddEdit />
        </Layout>
    );
}