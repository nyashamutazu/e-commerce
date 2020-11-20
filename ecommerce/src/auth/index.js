import { API } from "../config";

export const signup = user => {
  return fetch(`${API}/auth/sign-up`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(err => err);
};

export const signin = user => {
  return fetch(`${API}/auth/sign-in`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())
    .catch(err => err => err);
};

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined' || window !== null) {
    localStorage.setItem('t', JSON.stringify(data.token));
    next();
  }
}

export const signout = () => {
  if (typeof window !== 'undefined' || window !== null) {
    localStorage.removeItem('t')
  }

  return fetch(`${API}/auth/sign-out`, {
    method: "GET"
  })
    .then(response => response.json())
    .catch(err => err => err);
}

export const isAuthenticated = () => {
  if (typeof window === 'undefined' || window === null) {
    return false;
  }

  if (localStorage.getItem('t')) {
    return JSON.parse(localStorage.getItem('t'))
  } 

  return false;
}
