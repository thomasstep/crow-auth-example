const cookie = require('cookie');
const { createRemoteJWKSet } = require('jose/jwks/remote');
const { jwtVerify } = require('jose/jwt/verify');

export default async (req, res) => {
  try {
    const { token } = cookie.parse(req.headers.cookie ?? '');
    if (token) {
      const JWKS = createRemoteJWKSet(new URL('https://crowauth.thomasstep.com/v1/jwks.json'));
      const { payload, protectedHeader } = await jwtVerify(token, JWKS);
      const { email } = payload;
      return res.status(200).json({ email });
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
