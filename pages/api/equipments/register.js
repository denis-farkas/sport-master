import { apiHandler, equipmentsRepo } from "helpers/api";

// methode pour enregistrer les spaces
export default apiHandler({
  post: register,
});

async function register(req, res) {
  await equipmentsRepo.create(req.body);
  return res.status(200).json({});
}
