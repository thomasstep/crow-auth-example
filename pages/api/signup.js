const axios = require('axios');

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
      url: `${CROW_AUTH_API_URL}/v1/signup`,
      headers: {
        Authorization: `Bearer ${applicationJwt}`,
      },
      data: {
        email,
        password,
      },
    });
    if (crowAuthResponse.status === 201) {
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
