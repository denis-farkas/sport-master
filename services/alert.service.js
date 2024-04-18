import { BehaviorSubject } from 'rxjs';

// systeme  d'alerte méthodes d'envoi et d'effacement des alertes, ainsi qu'une propriété observable pour s'abonner aux alertes. déclencher une notification d'alerte depuis n'importe quel composant de l'application en appelant l'une des méthodes 

// BehaviorSubject (RxJS). service conçu pour gerer les alertes comme msg succés ou erreur
// créer un sujet qui émet une valeur initiale de null
const alertSubject = new BehaviorSubject(null);

// Exporte un objet qui expose trois fonctions et l'observable alert
export const alertService = {
    alert: alertSubject.asObservable(),
    success,
    error,
    clear
};

function success(message, showAfterRedirect = false) {
    alertSubject.next({
        type: 'alert-success',
        message,
        showAfterRedirect
    });
}

function error(message, showAfterRedirect = false) {
    alertSubject.next({
        type: 'alert-danger',
        message,
        showAfterRedirect
    });
}

// fonction pour vider les alertes
function clear() {
    // si showAfterRedirect est vrai dans l'alerte actuelle, il n'est pas effacé 
    //  pour les messages qui doivent persister après une redirection, par exemple, après une inscription réussie
    let alert = alertSubject.value;
    if (alert?.showAfterRedirect) {
        alert.showAfterRedirect = false;
    } else {
        alert = null;
    }
    alertSubject.next(alert);
}