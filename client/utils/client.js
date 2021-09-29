import axios from 'axios';

export const buildClient = ({ req }) => {
  const isServer = typeof window === 'undefined';

  return axios.create({
    baseURL: isServer ? process.env.INGRESS_CONTROLLER_URL : '',
    ...(isServer ? { headers: req.headers } : {}),
  });
};
