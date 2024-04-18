import { apiHandler, trainingsRepo } from "helpers/api";

// configure un gestionnaire API avec une seule méthode GET pour l'entité "training", utilisant la fonction getAll qui, à son tour, utilise le référentiel trainingsRepo pour récupérer tous les etrainings et renvoyer les résultats en format JSON. Ce script est conçu pour répondre aux requêtes GET pour obtenir la liste de tous les etrainings.
// utilise la methode getAll() pour recuperer les training
export default apiHandler({
  get: getAll,
});

async function getAll(req, res) {
  const trainings = await trainingsRepo.getAll();
  return res.status(200).json(trainings);
}
