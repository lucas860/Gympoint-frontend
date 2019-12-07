export function login(token, profile) {
  localStorage.setItem('@Gympoint', JSON.stringify({ auth: token, profile }));
}

export function logout() {
  localStorage.removeItem('@Gympoint');
}

export function isAuthenticated() {
  return JSON.parse(localStorage.getItem('@Gympoint')) !== null;
}

export function getToken() {
  return JSON.parse(localStorage.getItem('@Gympoint'));
}
