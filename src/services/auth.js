export function login(token, profile) {
  localStorage.setItem('gympoint', JSON.stringify({ auth: token, profile }));
}

export function logout() {
  localStorage.removeItem('gympoint');
}

export function isAuthenticated() {
  return JSON.parse(localStorage.getItem('gympoint') !== null);
}

export function getToken() {
  return JSON.parse(localStorage.getItem('gympoint'));
}
