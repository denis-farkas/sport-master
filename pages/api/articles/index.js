import { apiHandler, articlesRepo } from "helpers/api"; 
 
export default apiHandler({ 
  get: getAll, 
}); 
 
async function getAll(req, res) { 
  const articles = await articlesRepo.getAll(); 
  return res.status(200).json(articles); 
} 