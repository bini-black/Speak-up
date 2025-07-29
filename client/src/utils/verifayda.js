export const verifaydaOIDCConfig = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  redirect_uri: process.env.REACT_APP_REDIRECT_URI,
  response_type: 'code',
  scope: 'openid profile email',
  authority: process.env.REACT_APP_AUTH_URL, // or directly use https://auth.verifayda.com
};

export const getVerifaydaAuthUrl = () => {
  const { authority, client_id, redirect_uri, response_type, scope } = verifaydaOIDCConfig;
  return `${authority}/authorize?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(scope)}`;
};
