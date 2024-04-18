export * from "./alert.service";
export * from "./user.service";
export * from "./article.service";
export * from "./event.service";
export * from "./horaire.service";
export * from "./contact.service";
export * from "./space.service";
export * from "./equipment.service";
export * from "./training.service";

// services
// Les services gèrent toutes les communications HTTP de l'application frontale React à l'API back-end Next.js, chaque service encapsule les appels d'API pour un type de contenu (par exemple, les utilisateurs) et expose des méthodes pour effectuer diverses opérations (par exemple, les opérations CRUD). Les services peuvent également effectuer des actions qui n'impliquent pas de requêtes HTTP, telles que l'affichage et la suppression d'alertes avec le service d'alerte .
