
import { db } from 'helpers/api';



export const eventsRepo = {

    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getVarious
};

async function getVarious() {
    return await db.Event.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
  }

// requete avec des methode sequelize sur le model event
async function getAll() {
    return await db.Event.findAll();
}

async function getById(id) {
    return await db.Event.findByPk(id);
}

async function create(params) {
    
      const Event = new db.Event(params);
    // save event
    await Event.save();
}

async function update(id, params) {
    const event = await db.Event.findByPk(id);

    // validate
    if (!event) throw 'L Evenement n&apos;existe pas';

    // copy params properties to user
    Object.assign(event, params);

    await event.save();
}

async function _delete(id) {
    const event = await db.Event.findByPk(id);
    if (!event) throw 'L Evenement n&apos;existe pas';

    // supprime l evenement
    await event.destroy();
}