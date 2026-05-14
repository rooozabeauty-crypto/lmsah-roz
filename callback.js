const axios = require('axios');

async function handleSallaCallback(code) {
  try {
    const response = await axios.post(
      'https://accounts.salla.sa/oauth2/token',
      {
        grant_type: 'authorization_code',
        client_id: process.env.SALLA_CLIENT_ID,
        client_secret: process.env.SALLA_CLIENT_SECRET,
        redirect_uri: process.env.SALLA_REDIRECT_URI,
        code,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

module.exports = handleSallaCallback;
