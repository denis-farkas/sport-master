import { apiHandler, horairesRepo } from "helpers/api"; 
 
// utilise la methode getAll() pour recuperer les horaires
export default apiHandler({ 
  get: getAll, 
}); 

async function getAll(req, res) { 
  const horaires = await horairesRepo.getAll(); 
  return res.status(200).json(horaires); 
} 