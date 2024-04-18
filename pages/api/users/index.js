import { apiHandler, usersRepo } from 'helpers/api';

// gestionnaire de route API pour recuperer les utilisateur
// permet de récupérer tous les utilisateurs en répondant à une requête HTTP GET. Il utilise une structure  avec un gestionnaire de route API (apiHandler) et un module de répertoire d'utilisateurs (usersRepo)
export default apiHandler({
    get: getAll
});

async function getAll(req, res) {
    const users = await usersRepo.getAll();
    return res.status(200).json(users);
}
