export const auth = (email,pwd) => {
  const login = { mail: 'j.j@j.fr', password: '1x2x'};
  const loginOK  = email ===login.mail && pwd===login.password
  return loginOK
};
