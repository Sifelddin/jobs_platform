import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.ok) {
      router.replace('/');
    } else {
      setError('password', {
        type: 'credentials',
        message: 'invalid credentials',
      });
    }
  };
  const InputClasses =
    'bg-gray-50 appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-800 focus:bg-white ';
  return (
    <div className='w-full flex justify-center items-center h-screen bg-slate-50'>
      <div className='w-3/5 lg:w-2/5 bg-white p-6 rounded-md z-30 shadow-md '>
        <div className='w-full flex justify-between items-center my-3 text-lg'>
          <p>Sign Up if you don{"'"}t have an account?</p>
          <Link className='text-blue-700' href='/signup'>
            Sign up
          </Link>
        </div>
        {errors.password?.type === 'credentials' && (
          <span className='text-sm text-red-600'>
            {errors.password?.message}
          </span>
        )}
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Email</label>
            <input
              className={InputClasses}
              type='text'
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
            />
            {errors.email && (
              <span className='text-red-300 text-sm'>
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === 'required' && (
              <span className='text-red-300 text-sm'>email is required</span>
            )}
          </div>
          <div>
            <label>password</label>
            <input
              className={InputClasses}
              type='password'
              {...register('password', {
                required: true,
              })}
            />
          </div>
          <div className='w-full text-center m-1 space-x-3'>
            <button className='shadow bg-green-600 hover:bg-green-400 focus:shadow-outline focus:outline-none  text-white font-bold py-1 px-4 rounded '>
              Login
            </button>
            <Link
              href='/'
              className='shadow bg-gray-600 hover:bg-gray-400 focus:shadow-outline focus:outline-none  text-white font-bold py-1 px-4 rounded '
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
