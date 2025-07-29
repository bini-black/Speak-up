import React from 'react';

const Login = () => {
  const FAYDA_AUTH_URL =
    `${process.env.REACT_APP_FAYDA_AUTH_URL}?` +
    `client_id=${process.env.REACT_APP_FAYDA_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.REACT_APP_FAYDA_REDIRECT_URI)}&` +
    `response_type=code&scope=openid profile email`;

  // Debug print to check URL in console
  console.log('Fayda Auth URL:', FAYDA_AUTH_URL);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <a href={FAYDA_AUTH_URL}>
          <button
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Login with VeriFayda
          </button>
        </a>
      </div>
    </div>
  );
};

export default Login;
