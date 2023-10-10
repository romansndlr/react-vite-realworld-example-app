import sign from 'jwt-encode';
// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";

const secretKey = import.meta.env.VITE_SECRET_KEY
export function generateJWTToken() {
  const now = Math.floor(Date.now() / 1000)
  const expiresIn = 60

  const payload = {
    iat: now,
    exp: now + expiresIn,
  }
  const token = sign(payload, secretKey)
  
  return token
}

export function isValidToken(token) {
  try {
    const decodedToken = jwt_decode(token);
    if(decodedToken) {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return currentTimestamp < decodedToken?.exp;
    }
    return false;
  } catch (error) {
    return false
  }
}



