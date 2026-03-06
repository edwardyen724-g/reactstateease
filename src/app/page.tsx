'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

const LandingPage: React.FC = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      // Add your form submission logic here
      console.log("Form Data:", data);
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Effortlessly Manage State and Cache in Your React Applications</h1>
      <p className="text-lg text-center mb-8">
        Simplifying React state management and caching for developers using hooks.
      </p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email', { required: true })}
            type="email"
            id="email"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register('name', { required: true })}
            type="text"
            id="name"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
            placeholder="Your Name"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Get Started
        </button>
      </form>
    </div>
  );
};

export default LandingPage;