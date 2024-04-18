import { apiHandler, usersRepo } from 'helpers/api';

// les modules apiHandler et usersRepo provenant du dossier helpers/api. Le gestionnaire de route est destiné à gérer les requêtes HTTP liées à la manipulation des utilisateurs
// opérations CRUD (Create, Read, Update, Delete) pour la manipulation d'utilisateurs dans l'application
//   Le gestionnaire prend en charge les méthodes HTTP GET, PUT, et DELETE, en les associant aux fonctions correspondantes (getById, update, et _delete respectivement).
export default apiHandler({
    get: getById,
    put: update,
    delete: _delete
});

// la fonction getbyid est appelé lorsque une requete http get est recue , elle utilise usersRepo.getById pour obtenir les detail de l utilisateur en fonction de l'id passé en parametre dans la requete
// si l'utilisateur n'est pas trouvé une erreur est générée, sinon les détails de l'utilisateur sont renvoyé en tant que reponse json
async function getById(req, res) {
    const user = await usersRepo.getById(req.query.id);

    if (!user) throw 'Membre non existant';

    return res.status(200).json(user);
}
// mettre à jour les détails de l'utilisateur en fonction de l'ID passé en paramètre dans la requête, avec les données du corps de la requête. La réponse renvoie simplement un objet JSON vide avec un code d'état 200.
async function update(req, res) {
    await usersRepo.update(req.query.id, req.body);
    return res.status(200).json({});
}

async function _delete(req, res) {
    await usersRepo.delete(req.query.id);
    return res.status(200).json({});
}
