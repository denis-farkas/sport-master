
import { db } from 'helpers/api';



export const articlesRepo = {

    getAll,
    getById,
    create,
    update,
    delete: _delete,
    getVarious,
};

async function getVarious() {
    return await db.Article.findAll({
      order: [["createdAt", "DESC"]],
      limit: 3,
    });
  }

// requete avec des methode sequelize sur le model article
async function getAll() {
    return await db.Article.findAll();
}

async function getById(id) {
    return await db.Article.findByPk(id);
}

async function create(params) {
    
      const Article = new db.Article(params);
    // save article
    await Article.save();
}
// verification dans la base de donnée si l article existe pour ensuite le modifier
async function update(id, params) {
    const article = await db.Article.findByPk(id);

    // validate
    if (!article) throw 'Article n&apos;existe pas';

    // copy params properties to user
    Object.assign(article, params);

    await article.save();
}
// verification dans la base de donnée si l article existe si il existe il le supprime
async function _delete(id) {
    const article = await db.Article.findByPk(id);
    if (!article) throw 'Article n&apos;existe pas';

    // supprime article
    await article.destroy();
}