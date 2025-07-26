import axios from './baseService';

export const getLinkedInAuthUrl = () => {
  return axios
    .get('/auth/linkedin')
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const handleLinkedInCallback = (code: string, state: string) => {
  return axios
    .get(`/auth/linkedin/callback?code=${code}&state=${state}`)
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const getCurrentUser = () => {
  return axios
    .get('/auth/me')
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const logout = () => {
  return axios
    .post('/auth/logout')
    .then((res) => [null, res.data])
    .catch((error) => [error?.response?.data, null]);
};

export const authService = {
  getLinkedInAuthUrl,
  handleLinkedInCallback,
  getCurrentUser,
  logout
};
