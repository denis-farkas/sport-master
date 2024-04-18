// fichier de configuration Next.js définit les variables de configuration globales disponibles pour les composants de l'application
// Le apiUrlest utilisé par le service utilisateur pour envoyer des requêtes HTTP à l'API.

// La secretpropriété est utilisée pour signer et vérifier les jetons JWT pour l'authentification


// serverRuntimeConfigles variables ne sont disponibles que pour l'API côté serveur, tandis que publicRuntimeConfigles variables sont disponibles pour l'API et l'application client React.

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
      dbConfig: {
          host: 'localhost',
          port: 3306,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME
      },
      secret: process.env.SECRET,
  },
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000/api' // development api
          : 'http://localhost:3000/api' // production api
  },
  images: {
    path: "/images",
  },
}

module.exports = nextConfig


