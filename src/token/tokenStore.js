export function setToken(token) {
    sessionStorage.setItem('token', token)
  }
  
  export function getToken() {
    const token = sessionStorage.getItem('token')
    return token?? null;
  }

  