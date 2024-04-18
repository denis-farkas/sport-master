import { apiHandler, horairesRepo } from "helpers/api"; 

// methode pour enregistrer les horaires
export default apiHandler({ 
  post: register, 
}); 
 
async function register(req, res) { 
  await horairesRepo.create(req.body); 
  return res.status(200).json({}); 
} 