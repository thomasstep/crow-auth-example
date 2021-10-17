import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import Layout from '../../components/layout';

export default function ResetPassword() {
  const router = useRouter();
  const { resetToken: tokenFromQuery } = router.query;
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if(!tokenFromQuery) {
      return;
    }
    setResetToken(tokenFromQuery);
  }, [tokenFromQuery])

  function handleTokenFieldChange(event) {
    event.preventDefault();
    setResetToken(event.target.value);
  }

  function handleNewPasswordFieldChange(event) {
    event.preventDefault();
    setNewPassword(event.target.value);
  }

  async function handleResetPassword(event) {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await axios({
        method: 'POST',
        url: '/api/reset-password',
        data: {
          resetToken,
          password: newPassword,
        },
      });

      if (res.status === 200) {
        router.push('/profile/signin');
      } else {
        setErrorMessage('There was an error resetting your password');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      const responseStatus = err.response.status;
      if (responseStatus === 500) {
        setErrorMessage('An unknown error occured. If this persists, please contact us.');
        setLoading(false);
      } else {
        setErrorMessage('There was an error resetting your password');
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
          <label className="block mt-6">
            <span className="text-gray-700">Reset Token</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              value={resetToken}
              onChange={(e) => handleTokenFieldChange(e)}
            />
          </label>
          <label className="block mt-6">
            <span className="text-gray-700">New Password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              value={newPassword}
              onChange={(e) => handleNewPasswordFieldChange(e)}
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
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
        <p className="text-red-900">
          { errorMessage }
        </p>
      </main>
    </Layout>
  )
}
