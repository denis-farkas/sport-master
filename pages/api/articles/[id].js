import { apiHandler, articlesRepo } from "helpers/api"; 
 
export default apiHandler({ 
  get: getById, 
  put: update, 
  delete: _delete, 
}); 
 
async function getById(req, res) { 
  const article = await articlesRepo.getById(req.query.id); 
 
  if (!article) throw "Article non existant"; 
 
  return res.status(200).json(article); 
} 
 
async function update(req, res) { 
  await articlesRepo.update(req.query.id, req.body); 
  return res.status(200).json({}); 
} 
 
async function _delete(req, res) { 
  await articlesRepo.delete(req.query.id); 
  return res.status(200).json({}); 
}