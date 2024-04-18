
import getConfig from 'next/config';


import { fetchWrapper } from 'helpers';

// methode fetch pour le crud  des articles
const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/articles`;


export const articleService = {
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    getVarious,
};

async function getVarious() {
    return await fetchWrapper.get(`${baseUrl}/various`);
  }


async function register(article) {
    await fetchWrapper.post(`${baseUrl}/register`, article);
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