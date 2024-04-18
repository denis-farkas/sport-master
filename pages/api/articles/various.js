import { apiHandler, articlesRepo } from "helpers/api";

export default apiHandler({
  get: getVarious,
});

async function getVarious(req, res) {
  const articles = await articlesRepo.getVarious();
  return res.status(200).json(articles);
}