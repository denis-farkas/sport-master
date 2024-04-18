import { apiHandler, usersRepo } from 'helpers/api';

// route publique pour authentifier le nom d'utilisateur et le mot de passe et générer un jeton JWT.
export default apiHandler({
    post: authenticate
});

// gère les requêtes POST pour l'authentification.
async function authenticate(req, res) {
    const user = await usersRepo.authenticate(req.body);
    return res.status(200).json(user);
}
