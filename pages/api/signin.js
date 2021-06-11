const axios = require('axios');
const cookie = require('cookie');

const { getApplicationJwt } = require('../../utils/getApplicationJwt');
const { CROW_AUTH_API_URL } = require('../../utils/constants');

export default async (req, res) => {
  try {
    const applicationJwt = await getApplicationJwt();
    const {
      body: {
        email,
        password,
      },
    } = req;
    const crowAuthResponse = await axios({
      method: 'post',
      url: `${CROW_AUTH_API_URL}/v1/signin`,
      headers: {
        Authorization: `Bearer ${applicationJwt}`,
      },
      data: {
        email,
        password,
      },
    });
    if (crowAuthResponse.status === 200) {
      const token = crowAuthResponse.data.token;
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          maxAge: 6 * 60 * 60,
          path: '/',
          sameSite: 'lax',
          secure: true,
        }),
      );
      return res.status(200).end();
    } else {
      console.error(token.data);
      return res.status(crowAuthResponse.status).end();
    }
  } catch (err) {
    console.error(err.message);
    const responseStatus = err?.response?.status || 500;
    if (responseStatus >= 500) {
      return res.status(500).end();
    }
    return res.status(responseStatus).end();
  }
}
