import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchData } from '../utils/fetch_data';

type Inputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();
  console.log(errors);

  const router = useRouter();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { password, confirmPassword, name, email } = data;

    if (password === confirmPassword) {
      let data = { password, email, name };
      fetchData(`${process.env.NEXT_PUBLIC_HOST}/api/users`, data, 'POST').then(
        () => router.replace('/login'),
      );
    } else {
      setError('confirmPassword', {
        type: 'confirmation',
        message: 'incorrect password confirmation',
      });
    }
  };
  const InputClasses =
    'bg-gray-50 appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-800 focus:bg-white ';
  return (
    <div className='w-full flex justify-center items-center h-screen bg-slate-50'>
      <div className='w-3/5 lg:w-2/5 bg-white p-6 rounded-md z-30 shadow-md '>
        <div className='w-full flex justify-between items-center my-3 text-lg'>
          <p>Login if you have an account?</p>
          <Link className='text-blue-700' href='/login'>
            Login
          </Link>
        </div>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Username</label>
            <input
              className={InputClasses}
              type='text'
              {...register('name', {
                required: true,
              })}
            />
            <div>
              {errors.name?.type === 'required' && (
                <span className='text-red-300 text-sm'>
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>
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
                minLength: 6,
              })}
            />
            <div>
              {errors.password?.type === 'required' && (
                <span className='text-red-300 text-sm'>
                  password confirmation is required
                </span>
              )}
              {errors.password?.type === 'minLength' && (
                <span className='text-red-300 text-sm'>
                  password must have at least 6 characters
                </span>
              )}
            </div>
          </div>
          <div>
            <label>Password Confirm</label>
            <input
              className={InputClasses}
              type='password'
              {...register('confirmPassword', {
                required: true,
                minLength: 6,
              })}
            />
            <div>
              {errors.confirmPassword?.type === 'required' && (
                <span className='text-red-300 text-sm'>
                  password confirmation is required
                </span>
              )}
              {errors.confirmPassword?.type === 'confirmation' && (
                <span className='text-red-300 text-sm'>
                  {errors.confirmPassword?.message}
                </span>
              )}
              {errors.confirmPassword?.type === 'minLength' && (
                <span className='text-red-300 text-sm'>
                  password must have at least 6 characters
                </span>
              )}
            </div>
          </div>
          <div className='w-full text-center m-1 space-x-3'>
            <button className='shadow bg-green-600 hover:bg-green-400 focus:shadow-outline focus:outline-none   text-white font-bold py-1 px-4 rounded '>
              Sign up
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

export default Signup;
