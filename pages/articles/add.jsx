import { Layout, AddEditArticle } from 'components/articles';

export default Add;

function Add() {
    return (
        <Layout>
            <h1>Ajouter un article</h1>
            <AddEditArticle />
        </Layout>
    );
}