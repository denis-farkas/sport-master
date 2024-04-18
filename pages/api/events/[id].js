import { apiHandler, eventsRepo } from "helpers/api"; 
 
export default apiHandler({ 
  get: getById, 
  put: update, 
  delete: _delete, 
}); 
 
async function getById(req, res) { 
  const event = await eventsRepo.getById(req.query.id); 
 
  if (!event) throw "Evenement non existant"; 
 
  return res.status(200).json(event); 
} 
 
async function update(req, res) { 
  await eventsRepo.update(req.query.id, req.body); 
  return res.status(200).json({}); 
} 
 
async function _delete(req, res) { 
  await eventsRepo.delete(req.query.id); 
  return res.status(200).json({}); 
}