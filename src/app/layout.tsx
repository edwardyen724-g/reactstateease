import React from 'react';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ReactStateEase',
  description: 'Simplifying React state management and caching for developers using hooks.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">ReactStateEase</h1>
          <p className="text-sm">{metadata.description}</p>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-gray-800 text-white text-center p-4">
          <p>Effortlessly Manage State and Cache in Your React Applications</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;