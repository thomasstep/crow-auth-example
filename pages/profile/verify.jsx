import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import Layout from '../../components/layout';

export default function Verify() {
  const router = useRouter();
  const { verificationToken: tokenFromQuery } = router.query;
  const [verificationToken, setVerificationToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(!tokenFromQuery) {
      return;
    }
    setVerificationToken(tokenFromQuery);
  }, [tokenFromQuery])

  function handleVerificationFieldChange(event) {
    event.preventDefault();
    setVerificationToken(event.target.value);
  }

  async function handleVerification(event) {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await axios({
        method: 'POST',
        url: '/api/verify',
        data: {
          verificationToken,
        },
      });

      if (res.status === 200) {
        router.push('/profile/signin');
      } else {
        setErrorMessage('There was an error verifying your email');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      const responseStatus = err.response.status;
      if (responseStatus === 500) {
        setErrorMessage('An unknown error occured. If this persists, please contact us.');
        setLoading(false);
      } else {
        setErrorMessage('There was an error verifying your email');
        setLoading(false);
      }
    }
  }

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="flex md:flex-row justify-center my-6">
          <h1 className="text-6xl font-bold mt-6">
            Verify Email
          </h1>
        </div>

        <div className="flex flex-col justify-center my-6">
          <label className="block mt-6">
            <span className="text-gray-700">Verification Token</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              value={verificationToken}
              onChange={(e) => handleVerificationFieldChange(e)}
            />
          </label>
          <button
            className={`
              bg-white mt-6 border rounded-xl border-gray-300 p-2 hover:bg-purple-500 hover:text-white
              ${
                loading ? "bg-purple-500 text-white animate-pulse" : ""
              }
            `}
            disabled={loading}
            onClick={handleVerification}
          >
            Verify
          </button>
        </div>
        <p className="text-red-900">
          { errorMessage }
        </p>
      </main>
    </Layout>
  )
}
