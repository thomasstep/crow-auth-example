import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import Layout from '../../components/layout';

export default function ResetPasswordEmail() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleEmailFieldChange(event) {
    event.preventDefault();
    setEmail(event.target.value);
  }

  async function handleSendResetPasswordEmail(event) {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await axios({
        method: 'get',
        url: '/api/reset-password/send-email',
        params: {
          email,
        },
      });

      if (res.status === 200) {
        router.push('/profile/reset-password');
      } else {
        setErrorMessage('There was an error sending email');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      const responseStatus = err.response.status;
      if (responseStatus === 500) {
        setErrorMessage('An unknown error occured. If this persists, please contact us.');
        setLoading(false);
      } else {
        setErrorMessage('There was an error sending email');
        setLoading(false);
      }
    }
  }

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="flex md:flex-row justify-center my-6">
          <h1 className="text-6xl font-bold mt-6">
            Reset Password
          </h1>
        </div>

        <div className="flex flex-col justify-center my-6">
          <label className="mt-6">Email address</label>
          <input
            type="email"
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            placeholder=""
            value={email}
            onChange={(e) => handleEmailFieldChange(e)}
          />
          <button
            className={`
              bg-white mt-6 border rounded-xl border-gray-300 p-2 hover:bg-purple-500 hover:text-white
              ${
                loading ? "bg-purple-500 text-white animate-pulse" : ""
              }
            `}
            disabled={loading}
            onClick={handleSendResetPasswordEmail}
          >
            Send Email
          </button>
        </div>

        <p>
          <a href="/profile/signin" className="font-bold hover:text-purple-500 focus:text-purple-500">
            Sign In
          </a>
        </p>
        <p className="text-red-900">
          { errorMessage }
        </p>
      </main>
    </Layout>
  )
}
