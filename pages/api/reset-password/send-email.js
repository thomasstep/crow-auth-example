const axios = require('axios');
const cookie = require('cookie');
const { createRemoteJWKSet } = require('jose/jwks/remote');
const { jwtVerify } = require('jose/jwt/verify');

const { getApplicationJwt } = require('../../../utils/getApplicationJwt');
const { CROW_AUTH_API_URL } = require('../../../utils/constants');

export default async (req, res) => {
  try {
    const { token } = cookie.parse(req.headers.cookie ?? '');
    if (token) {
      const JWKS = createRemoteJWKSet(new URL('https://crow-auth.thomasstep.com/v1/jwks.json'));
      const { payload, protectedHeader } = await jwtVerify(token, JWKS);
      const { email } = payload;

      const applicationJwt = await getApplicationJwt();

      const crowResponse = await axios({
        method: 'post',
        url: `${CROW_AUTH_API_URL}/v1/reset-password/send-email`,
        headers: {
          Authorization: `Bearer ${applicationJwt}`,
        },
        data: {
          email,
        },
      });
      if (crowResponse.status === 201) {
        return res.status(200).end();
      } else {
        return res.status(crowAuthResponse.status).end();
      }
    }
    return res.status(404).end();
  } catch (err) {
    console.error(err.message);
    const responseStatus = err?.response?.status || 500;
    if (responseStatus >= 500) {
      return res.status(500).end();
    }
    return res.status(responseStatus).end();
  }
}
