import React from 'react';
import Header from './header';
import Footer from './footer';

export default function Layout(props) {
  const {
    children,
  } = props;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2 bg-yellow-50">
      <Header />

      {children}

      <Footer />
    </div>
  );
}