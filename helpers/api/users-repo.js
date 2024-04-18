import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';

// jwt bibliotheque pour creer et verifier les json web tokens
// bcrypt : bibliotheque pour hacher les mots de passe
// utilisation des fonctions asinchrones pour gérer les operations qui prennent du temps et sans bloquerl "xecution du programmes"

const { serverRuntimeConfig } = getConfig();

export const usersRepo = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

// fonction d'authentification
async function authenticate({ email, password }) {
    // recupere un utilisateur en base de donnee en fonction de son email.scope('withHash') utilisation d'une portee specifique  qui inclut le champs de hachage du mot de passe lors de la recherche
    const user = await db.User.scope('withHash').findOne({ where: { email } });

// verifie si l utilisateur existe et si le mot de passe fourni correspiond au mot de passe haché en base de données.
    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Email ou mot de passe incorrect';
    }

    // creer un jeton JWT valide pendant 7 jours 
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // Suppression du hash du mot de passe de la valeur de retour
    const userJson = user.get();
    delete userJson.hash;

    // retour d'un objet contenant les informations de l'utilisateur et le jeton
    return {
        ...userJson,
        token
    };
}

// recupere tout les utilisateur de la base de donnees avec la methode findAll()
async function getAll() {
    return await db.User.findAll();
}

// recupere un utilisateur par sa clé primaire(id) depuis la db
async function getById(id) {
    return await db.User.findByPk(id);
}

async function create(params) {
    // verifie si l email existe deja dans la base de donnee
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '"  existe déjà';
    }

    // creer un nouvel utilisateur avec les parametre
    const user = new db.User(params);

    // hash le mot de pass 10 est le cout du hachage nbr de tours de hachage pour la sécurité du hachage
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // sauvegarde l utilisateur en base de donnée
    await user.save();
}

// fonction mettre a jour l utilisateur par son id
async function update(id, params) {
    const user = await db.User.findByPk(id);

    // verifie l existence de l'utilisateur si l 'email existe deja pour un autre utilisateur
    if (!user) throw 'Membre n&apos;existe pas';
    if (user.email !== params.email && await db.User.findOne({ where: { email: params.email } })) {
        throw 'Email "' + params.email + '" existe déjà';
    }

    // hash le mot de passe si il est fourni
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copie les propriete des parametre vers l utilisateur
    Object.assign(user, params);
    // sauvegarde des modifications dans la base de donnée
    await user.save();
}

async function _delete(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'Membre n&apos;existe pas';

    // supprime l utilisateur de la base de donnee
    await user.destroy();
}