const axios = require('axios');

const { getApplicationJwt } = require('../../../utils/getApplicationJwt');
const { CROW_AUTH_API_URL } = require('../../../utils/constants');

export default async (req, res) => {
  try {
    const applicationJwt = await getApplicationJwt();
    const {
      body: {
        resetToken,
        password,
      },
    } = req;
    const crowResponse = await axios({
      method: 'post',
      url: `${CROW_AUTH_API_URL}/v1/reset-password`,
      headers: {
        Authorization: `Bearer ${applicationJwt}`,
      },
      data: {
        resetToken,
        password,
      },
    });
    if (crowResponse.status === 201) {
      return res.status(200).end();
    } else {
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
