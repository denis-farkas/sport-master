export { errorHandler };

// affiche les erreurs
function errorHandler(err, res) {
    if (typeof (err) === 'string') {
     
        const is404 = err.toLowerCase().endsWith(', page introuvable');
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt erreur d'authentification
        return res.status(401).json({ message: 'Token Invalide' });
    }

    // default erreur 500 serveur
    console.error(err);
    return res.status(500).json({ message: err.message });
}