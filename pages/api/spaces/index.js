import { apiHandler, spacesRepo } from "helpers/api";

// configure un gestionnaire API avec une seule méthode GET pour l'entité "space", utilisant la fonction getAll qui, à son tour, utilise le référentiel spacesRepo pour récupérer tous les espaces et renvoyer les résultats en format JSON. Ce script est conçu pour répondre aux requêtes GET pour obtenir la liste de tous les espaces.
// utilise la methode getAll() pour recuperer les space
export default apiHandler({
  get: getAll,
});

async function getAll(req, res) {
  const spaces = await spacesRepo.getAll();
  return res.status(200).json(spaces);
}
