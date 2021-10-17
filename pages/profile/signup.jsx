import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import Layout from '../../components/layout';

export default function Signin({ email }) {
  const router = useRouter();
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleSignUpEmailFieldChange(event) {
    event.preventDefault();
    setSignUpEmail(event.target.value);
  }

  function handleSignUpPasswordFieldChange(event) {
    event.preventDefault();
    setSignUpPassword(event.target.value);
  }

  async function handleEmailPasswordSignUp(event) {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const body = {
      email: signUpEmail,
      password: signUpPassword,
    };

    try {
      const res = await axios({
        method: 'POST',
        url: '/api/signup',
        data: {
          email: signUpEmail,
          password: signUpPassword,
        },
      });

      if (res.status === 200) {
        router.push('/profile/verify');
      } else {
        setErrorMessage('There was an error signing up');
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      const responseStatus = err.response.status;
      if (responseStatus === 500) {
        setErrorMessage('An unknown error occured. If this persists, please contact us.');
        setLoading(false);
      } else {
        setErrorMessage('There was an error signing up');
        setLoading(false);
      }
    }
  }

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="flex md:flex-row justify-center my-6">
          <h1 className="text-6xl font-bold mt-6">
            Sign Up
          </h1>
        </div>

        <div className="flex flex-col justify-center my-6">
          <label className="block mt-6">
            <span className="text-gray-700">Email address</span>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              value={signUpEmail}
              onChange={(e) => handleSignUpEmailFieldChange(e)}
            />
          </label>
          <label className="block mt-6">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              value={signUpPassword}
              onChange={(e) => handleSignUpPasswordFieldChange(e)}
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
            onClick={handleEmailPasswordSignUp}
          >
            Sign Up
          </button>
        </div>

        <div className="flex flex-row gap-6">
          <p>
            <a href="/profile/signin" className="font-bold hover:text-purple-500 focus:text-purple-500">
              Sign In
            </a>
          </p>

          <p>
            <a href="/profile/reset-password-email" className="font-bold hover:text-purple-500 focus:text-purple-500">
              Reset Password
            </a>
          </p>
        </div>
        <p className="text-red-900">
          { errorMessage }
        </p>
      </main>
    </Layout>
  )
}
