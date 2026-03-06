import React from 'react';
import { useForm } from 'react-hook-form';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface AuthFormProps {
  mode: 'login' | 'signup';
}

interface FormData {
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      let { error } = mode === 'login' 
        ? await supabase.auth.signInWithPassword({ email: data.email, password: data.password })
        : await supabase.auth.signUp({ email: data.email, password: data.password });

      if (error) throw error;

      router.push('/dashboard');
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { required: 'Password is required' })}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
      </div>
      <button type="submit" className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        {mode === 'login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;