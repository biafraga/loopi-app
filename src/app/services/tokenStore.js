let tokenJWT = null;

export const setToken = (t) => { tokenJWT = t; };
export const clearToken = () => { tokenJWT = null; };
export const getToken = () => tokenJWT;
