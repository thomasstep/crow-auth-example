const axios = require('axios');

const { createRemoteJWKSet } = require('jose/jwks/remote');
const { jwtVerify } = require('jose/jwt/verify');

const { CROW_AUTH_API_URL } = require('./constants');

let APPLICATION_JWT;

async function getApplicationJwt() {
  if (APPLICATION_JWT) {
    const JWKS = createRemoteJWKSet(new URL('https://crowauth.com/v1/application-jwks.json'));
    try {
      await jwtVerify(APPLICATION_JWT, JWKS, {
        maxTokenAge: 1800, // 1800 seconds or 30 minutes
      });
      return APPLICATION_JWT;
    } catch (err) {
      console.error('There was an error validating application JWT. It might bee older than 30 minutes.');
      console.error(err);
    }
  }

  const jwtResponse = await axios({
    method: 'post',
    url: `${CROW_AUTH_API_URL}/v1/application/signin`,
    data: {
      applicationId: process.env.CROW_AUTH_APP_ID,
      applicationSecret: process.env.CROW_AUTH_APP_SECRET,
    },
  });

  if (jwtResponse.status === 200) {
    const token = jwtResponse.data.token;

    const JWKS = createRemoteJWKSet(new URL('https://crowauth.com/v1/application-jwks.json'));
    try {
      await jwtVerify(token, JWKS, {
        audience: process.env.CROW_AUTH_APP_ID,
        issuer: 'https://api.crowauth.com',
      });
    } catch (err) {
      console.error('There was an error validating new application JWT.');
      throw err;
    }

    APPLICATION_JWT = token;
    return APPLICATION_JWT;
  } else {
    throw new Error('Could not get application JWT');
  }
}

module.exports = {
  getApplicationJwt,
};
