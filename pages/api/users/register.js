import { apiHandler, usersRepo } from 'helpers/api';

// enregistrer un nouvel utilisateur en repondant a une requette http post
export default apiHandler({
    post: register
});

async function register(req, res) {
    await usersRepo.create(req.body);
    return res.status(200).json({});
}
