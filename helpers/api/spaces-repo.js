import { db } from "helpers/api";
// expose un objet spacesRepo qui offre des méthodes pour interagir avec la base de données, en utilisant Sequelize pour effectuer des opérations CRUD sur l'entité "space".
export const spacesRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

// requete avec des methode sequelize sur le model space
// onction asynchrone getAll qui utilise Sequelize pour récupérer tous les espaces en appelant db.Space.findAll().
async function getAll() {
  return await db.Space.findAll();
}
// fonction asynchrone getById qui utilise Sequelize pour récupérer un espace par son identifiant en appelant db.Space.findByPk(id).
async function getById(id) {
  return await db.Space.findByPk(id);
}

async function create(params) {
  const Space = new db.Space(params);
  // save space
  await Space.save();
}

async function update(id, params) {
  const space = await db.Space.findByPk(id);

  // validate
  if (!space) throw "L espace n&apos;existe pas";

  // copy params properties to user
  Object.assign(space, params);

  await space.save();
}

async function _delete(id) {
  const space = await db.Space.findByPk(id);
  if (!space) throw "L Espace n&apos;existe pas";

  // supprime l evenement
  await space.destroy();
}
