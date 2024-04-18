import getConfig from "next/config";

import { fetchWrapper } from "helpers";

// space.service declare les routes qu on va utiliser dans l 'api
// methode fetch pour le crud  des spaces
const { publicRuntimeConfig } = getConfig();
// routes pour acceder a l api
const baseUrl = `${publicRuntimeConfig.apiUrl}/spaces`;

export const spaceService = {
  register,
  getAll,
  getById,
  update,
  delete: _delete,
};
// quand tu veux enreigistrer un space il faut faire un fetch avec la methode post sur l adresse baseurlregister avec comme parametre article
async function register(space) {
  await fetchWrapper.post(`${baseUrl}/register`, space);
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
