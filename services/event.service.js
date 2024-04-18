
import getConfig from 'next/config';
// getconfig est utilise pour la configuration de l'application, de l'URL de lApi

import { fetchWrapper } from 'helpers';

// methode fetch pour le crud  des evenement
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/events`;


export const eventService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    getVarious
};

async function getVarious() {
    return await fetchWrapper.get(`${baseUrl}/various`);
  }
    // requete post pour enregistrer un Event
async function register(event) {
    await fetchWrapper.post(`${baseUrl}/register`, event);
}
// requête GET pour obtenir tous les events
async function getAll() {
    return await fetchWrapper.get(baseUrl);
}
// selectionne un event par son id
async function getById(id) {
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function update(id, params) {
    await fetchWrapper.put(`${baseUrl}/${id}`, params);

    
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(id) {
    await fetchWrapper.delete(`${baseUrl}/${id}`);

 
}