import { db } from "helpers/api";
// expose un objet trainingsRepo qui offre des méthodes pour interagir avec la base de données, en utilisant Sequelize pour effectuer des opérations CRUD sur l'entité "training".
export const trainingsRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

// requete avec des methode sequelize sur le model training
// onction asynchrone getAll qui utilise Sequelize pour récupérer tous les etrainings en appelant db.Training.findAll().
async function getAll() {
  return await db.Training.findAll();
}
// fonction asynchrone getById qui utilise Sequelize pour récupérer un etraining par son identifiant en appelant db.Training.findByPk(id).
async function getById(id) {
  return await db.Training.findByPk(id);
}

async function create(params) {
  const Training = new db.Training(params);
  // save training
  await Training.save();
}

async function update(id, params) {
  const training = await db.Training.findByPk(id);

  // validate
  if (!training) throw "L Entrainement n&apos;existe pas";

  // copy params properties to user
  Object.assign(training, params);

  await training.save();
}

async function _delete(id) {
  const training = await db.Training.findByPk(id);
  if (!training) throw "L Entrainement n&apos;existe pas";

  // supprime l evenement
  await training.destroy();
}
