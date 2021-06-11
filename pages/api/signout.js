const cookie = require('cookie');

export default async (req, res) => {
  try {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        maxAge: -1,
        path: '/',
        sameSite: 'lax',
        secure: true,
      }),
    );
    return res.status(200).end();
  } catch (err) {
    console.error(err.message);
    const responseStatus = err?.response?.status || 500;
    if (responseStatus >= 500) {
      return res.status(500).end();
    }
    return res.status(responseStatus).end();
  }
}
