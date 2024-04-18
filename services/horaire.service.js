import getConfig from "next/config";

import { fetchWrapper } from "helpers";

// horaire.service declare les routes qu on va utiliser dans l 'api
// methode fetch pour le crud  des horaires
const { publicRuntimeConfig } = getConfig();
// routes pour acceder a l api
const baseUrl = `${publicRuntimeConfig.apiUrl}/horaires`;

export const horaireService = {
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};
// quand tu veux enreigistrer un horaire il faut faire un fetch avec la methode post sur l adresse baseurlregister avec comme parametre article
async function register(horaire) {
  await fetchWrapper.post(`${baseUrl}/register`, horaire);
}

async function getAll() {
  return await fetchWrapper.get(baseUrl);
}

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
