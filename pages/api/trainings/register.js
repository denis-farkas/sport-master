import { apiHandler, trainingsRepo } from "helpers/api";

// methode pour enregistrer les training
export default apiHandler({
  post: register,
});

async function register(req, res) {
  await trainingsRepo.create(req.body);
  return res.status(200).json({});
}
