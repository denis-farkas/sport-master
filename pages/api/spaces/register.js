import { apiHandler, spacesRepo } from "helpers/api";

// methode pour enregistrer les spaces
export default apiHandler({
  post: register,
});

async function register(req, res) {
  await spacesRepo.create(req.body);
  return res.status(200).json({});
}
