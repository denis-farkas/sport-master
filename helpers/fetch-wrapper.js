import getConfig from "next/config";

import { userService } from "services";

const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get: request("GET"),
  post: request("POST"),
  put: request("PUT"),
  delete: request("DELETE"),
};

function request(method) {
  return (url, body) => {
    const requestOptions = {
      method,
      headers: authHeader(url),
    };
    if (body) {
      requestOptions.headers["Content-Type"] = "application/json";
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(url, requestOptions).then(handleResponse);
  };
}

// permet à l'API de vérifier l'authenticité de l'utilisateur.

function authHeader(url) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = userService.userValue;
  // vérifie si l'utilisateur est connecté en examinant la propriété token
  const isLoggedIn = user?.token;
  // vérifie si l'URL de la requête commence par l'URL de l'API en comparant url à publicRuntimeConfig.apiUrl. Cela permet de déterminer si la requête est destinée à l'API ou à un autre endpoint.
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

async function handleResponse(response) {
  const isJson = response.headers
    ?.get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : null;

  // verifier les erreurs des reponses
  if (!response.ok) {
    if ([401, 403].includes(response.status) && userService.userValue) {
      // deconnexion automatique si la reponse nest pas bonne
      userService.logout();
    }

    // réer un message d'erreur à partir de la réponse HTTP en cas d'erreur, puis rejeter une promesse avec ce message d'erreur
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
