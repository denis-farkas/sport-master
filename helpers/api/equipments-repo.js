import { db } from "helpers/api";
// expose un objet equipmentRepo qui offre des méthodes pour interagir avec la base de données, en utilisant Sequelize pour effectuer des opérations CRUD sur l'entité "equipment".
export const equipmentsRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

// requete avec des methode sequelize sur le model equipment
// fonction asynchrone getAll qui utilise Sequelize pour récupérer tous les equipement en appelant db.Equipment.findAll().
async function getAll() {
  return await db.Equipment.findAll();
}
// fonction asynchrone getById qui utilise Sequelize pour récupérer un eequipment par son identifiant en appelant db.Equipment.findByPk(id).
async function getById(id) {
  return await db.Equipment.findByPk(id);
}

async function create(params) {
  const Equipment = new db.Equipment(params);
  // save equipment
  await Equipment.save();
}

async function update(id, params) {
  const equipment = await db.Equipment.findByPk(id);

  // validate
  if (!equipment) throw "L equipement n&apos;existe pas";

  // copy params properties to user
  Object.assign(equipment, params);

  await equipment.save();
}

async function _delete(id) {
  const equipment = await db.Equipment.findByPk(id);
  if (!equipment) throw "L Eequipment n&apos;existe pas";

  // supprime l evenement
  await equipment.destroy();
}
