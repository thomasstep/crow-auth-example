import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';

import Layout from '../../components/layout';

export default function Profile() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!email) {
      axios({
        method: 'get',
        url: '/api/user',
      })
        .then((response) => {
          const { data: { email: resEmail } } = response;
          setEmail(resEmail);
        })
        .catch((response) => {
          console.error(response);
          router.push('/profile/signin');
        });
    }
  }, []);

  async function handleSignOut(event) {
    event.preventDefault();
    setErrorMessage('');

    try {
      const res = await fetch('/api/signout', {
        method: 'GET',
      });
      if (res.status === 200) {
        router.push('/profile/signin');
      } else {
        setErrorMessage('There was an error signing out');
      }
    } catch (err) {
      console.error(err);
      const responseStatus = err.response.status;
      if (responseStatus === 500) {
        setErrorMessage('An unknown error occured. If this persists, please contact us.');
      } else {
        setErrorMessage('There was an error signing out');
      }
    }
  }

  async function handleResetPassword(event) {
    event.preventDefault();
    setErrorMessage('');

    try {
      const res = await axios({
        method: 'post',
        url: '/api/reset-password/send-email',
        data: {
          email,
        },
      });
      if (res.status === 200) {
        router.push('/profile/reset-password');
      } else {
        setErrorMessage('There was an error sending reset password email');
      }
    } catch (err) {
      console.error(err);
      const responseStatus = err.response.status;
      if (responseStatus !== 500 || responseStatus !== 502) {
        setErrorMessage('There was an error sending reset password email');
      } else {
        setErrorMessage('An unknown error occured');
      }
    }
  }

  if (!email) {
    return (
      <Layout>
        <main className="flex flex-col items-center justify-center flex-1 text-center">
          <div className="flex md:flex-row justify-center my-6">
            <h1 className="text-6xl font-bold mt-6">
              Welcome to <a href="/" className="hover:text-purple-500 focus:text-purple-500">Crow Auth</a>
            </h1>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-center my-6">
            <h1 className="text-6xl font-bold mt-6">
              Loading...
            </h1>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="flex md:flex-row justify-center my-6">
          <h1 className="text-6xl font-bold mt-6">
            Welcome to <a href="/" className="hover:text-purple-500 focus:text-purple-500">Crow Auth</a>
          </h1>
        </div>

          <h1 className="text-6xl font-bold mt-6">
            { email }
          </h1>

          <h1 onClick={handleSignOut} className="text-6xl font-bold mt-6 hover:text-purple-500 focus:text-purple-500 cursor-pointer">
            Sign Out
          </h1>

          <h1 onClick={handleResetPassword} className="text-6xl font-bold mt-6 hover:text-purple-500 focus:text-purple-500 cursor-pointer">
            Reset Password
          </h1>
          <p className="text-red-900">
            { errorMessage }
          </p>
      </main>
    </Layout>
  );
}
