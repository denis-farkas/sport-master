
import { db } from 'helpers/api';

// requete sequelize que l on  fait directement dans la base de données
// methode sequelize qui sont comprise par mysql dans la base de données

export const horairesRepo = {

    getAll,
    getById,
    create,
    update,
    delete: _delete,
    
};



// requete avec des methode sequelize sur le model horaire
async function getAll() {
    return await db.Horaire.findAll();
}

async function getById(id) {
    return await db.Horaire.findByPk(id);
}

async function create(params) {
    
      const Horaire = new db.Horaire(params);
    // save Horaire
    await Horaire.save();
}
// verification dans la base de donnée si l horaire existe pour ensuite le modifier

async function update(id, params) {
    const horaire = await db.Horaire.findByPk(id);

    // validate
    if (!horaire) throw 'L horaire n&apos;existe pas';

    // copy params properties to user
    Object.assign(horaire, params);

    await horaire.save();
}

// verification dans la base de donnée si l horaire existe pour ensuite le supprimer
async function _delete(id) {
    const horaire = await db.horaire.findByPk(id);
    if (!horaire) throw 'L Evenement n&apos;existe pas';

    // supprime l horaire
    await horaire.destroy();
}