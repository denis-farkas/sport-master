import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

// orm permet de creer une correspondance entre un modele objet et un modele relationnel de base de donnée
// Sequelize ORM (Object Relational Mapper) est utilisé pour connecter, interroger et gérer les données dans la base de données MySQL. Sequelize prend également en charge la synchronisation des modèles pour générer automatiquement des tables et des colonnes de base de données basées sur des modèles définis dans le code.

const { serverRuntimeConfig } = getConfig();

export const db = {
  initialized: false,
  initialize,
};
// creation des tables dans la base de donnees
// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
    retry: {
      match: [/Deadlock/i],
      max: 3, // Maximum rety 3 times
      backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
    },
  });

  // initialise les modèles  ajoute à l'objet de base de données
  db.User = userModel(sequelize);
  db.Article = articleModel(sequelize);
  db.Event = eventModel(sequelize);
  db.Horaire = horaireModel(sequelize);
  db.Contact = contactModel(sequelize);
  db.Space = spaceModel(sequelize);
  db.Equipment = equipmentModel(sequelize);
  db.Training = trainingModel(sequelize);

  // relation ajoute entre article event et user article et event sont appartienent a user
  db.Article.belongsTo(db.User, { foreignKey: "userId" });
  db.Event.belongsTo(db.User, { foreignKey: "userId" });
  db.Training.belongsTo(db.Space, { foreignKey: "spaceId" });
  db.Training.belongsTo(db.Equipment, { foreignKey: "equipmentId" });
  db.Training.belongsTo(db.User, { foreignKey: "employeeId" });
  db.User.belongsTo(db.Training, {
    foreignKey: "trainingId",
    allowNull: true,
    defaultValue: null,
  });

  // synchroniser les tables avec la base de donnée a chaque connexion  vérifie quel est l'état actuel de la table dans la base de données puis effectue les modifications nécessaires dans la table pour qu'elle corresponde au modèle.
  async function alterDatabase() {
    // Start a transaction
    const transaction = await sequelize.transaction();

    try {
      // Perform alterations within the transaction
      await sequelize.sync({ alter: true, transaction });

      // Commit the transaction if alterations succeed
      await transaction.commit();
      console.log("Database alterations committed successfully");
    } catch (error) {
      // Rollback the transaction if an error occurs
      await transaction.rollback();
      console.error("Database alterations failed:", error);
    }
  }

  // Call the alteration function
  alterDatabase();

  db.initialized = true;
}

// sequelize models with schema definitions
// on cree le model pour l'utilisateur
function userModel(sequelize) {
  const attributes = {
    email: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    // defaultValue quand on enregitre une personne sans préciser son roles il est automatiquement un USER
    roles: { type: DataTypes.STRING, allowNull: false, defaultValue: "USER" },
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
}

// on constitue le model pour les articles
function articleModel(sequelize) {
  const attributes = {
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
  };
  return sequelize.define("Article", attributes);
}

// model Evenement

function eventModel(sequelize) {
  const attributes = {
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    rdv: { type: DataTypes.STRING, allowNull: false },
  };
  return sequelize.define("Event", attributes);
}

// modele horaires

function horaireModel(sequelize) {
  const attributes = {
    jour: { type: DataTypes.STRING, allowNull: false },
    debut_matin: { type: DataTypes.STRING, allowNull: true },
    fin_matin: { type: DataTypes.STRING, allowNull: true },
    debut_apresmidi: { type: DataTypes.STRING, allowNull: true },
    fin_apresmidi: { type: DataTypes.STRING, allowNull: true },
    fermeture_matin: { type: DataTypes.TINYINT, allowNull: true },
    fermeture_apresmidi: { type: DataTypes.TINYINT, allowNull: true },
  };
  return sequelize.define("Horaire", attributes);
}

// model contact

function contactModel(sequelize) {
  const attributes = {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    numero: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
  };
  return sequelize.define("Contact", attributes);
}

function spaceModel(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
  };
  return sequelize.define("Space", attributes);
}

function equipmentModel(sequelize) {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
  };
  return sequelize.define("Equipment", attributes);
}

function trainingModel(sequelize) {
  const attributes = {
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  };
  return sequelize.define("Training", attributes);
}
