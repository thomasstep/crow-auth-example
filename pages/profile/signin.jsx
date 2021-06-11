import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

export default function Signin({ email }) {
  const router = useRouter();
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSignInEmailFieldChange(event) {
    event.preventDefault();
    setSignInEmail(event.target.value);
  }

  function handleSignInPasswordFieldChange(event) {
    event.preventDefault();
    setSignInPassword(event.target.value);
  }

  async function handleEmailPasswordSignIn(event) {
    event.preventDefault();
    setErrorMessage('');

    try {
      const res = await axios({
        method: 'POST',
        url: '/api/signin',
        data: {
          email: signInEmail,
          password: signInPassword,
        },
      });

      if (res.status === 200) {
        router.push('/profile');
      } else {
        setErrorMessage('There was an error signing in');
      }
    } catch (err) {
      console.error(err);
      const responseStatus = err.response.status;
      if (responseStatus === 500) {
        setErrorMessage('An unknown error occured. If this persists, please contact us.');
      } else {
        setErrorMessage('There was an error signing in');
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="flex md:flex-row justify-center my-6">
          <h1 className="text-6xl font-bold mt-6">
            Welcome to <a href="/" className="hover:text-purple-500 focus:text-purple-500">Crow Auth</a>
          </h1>
        </div>

        <div className="flex flex-col justify-center my-6">
          <h1 className="text-6xl font-bold mt-6">
            { email }
          </h1>
          <label className="block mt-6">
            <span className="text-gray-700">Email address</span>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              value={signInEmail}
              onChange={(e) => handleSignInEmailFieldChange(e)}
            />
          </label>
          <label className="block mt-6">
            <span className="text-gray-700">Password</span>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder=""
              value={signInPassword}
              onChange={(e) => handleSignInPasswordFieldChange(e)}
            />
          </label>
          <button
            className="mt-6 border p-2 hover:bg-purple-500 hover:text-white"
            onClick={handleEmailPasswordSignIn}
          >
            Sign In
          </button>
        </div>
        <p>
          Don't have an account?
        </p>
        <p>
          <a href="/profile/signup" className="font-bold hover:text-purple-500 focus:text-purple-500">
            Sign Up
          </a>
        </p>
        <p className="text-red-900">
          { errorMessage }
        </p>
      </main>
    </div>
  )
}
