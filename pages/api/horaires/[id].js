import { apiHandler, horairesRepo } from "helpers/api"; 
//  utilise les methodes qui sont dans le repo
export default apiHandler({ 
  get: getById, 
  put: update, 
  delete: _delete, 
}); 
 
async function getById(req, res) { 
  const horaire = await horairesRepo.getById(req.query.id); 
 
  if (!horaire) throw "horaire non existant"; 
 
  return res.status(200).json(horaire); 
} 
 
async function update(req, res) { 
  await horairesRepo.update(req.query.id, req.body); 
  return res.status(200).json({}); 
} 
 
async function _delete(req, res) { 
  await horairesRepo.delete(req.query.id); 
  return res.status(200).json({}); 
}