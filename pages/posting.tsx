import { Contract } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import MessageModal from '../components/MessageModal';
import { POLYNESIA_TOWNS } from '../constants/api';
import { fetchData } from '../utils/fetch_data';

type Inputs = {
  employer: string;
  email: string;
  offer: string;
  city: String;
  description: string;
  contract: Contract;
};

type City = {
  nom: string;
  code: string;
  codeDepartement: string;
  codeRegion: string;
  codesPostaux: string[];
  population: number;
};

export const getStaticProps = async () => {
  //https://geo.api.gouv.fr/departements/987/communes
  let res = await fetch(POLYNESIA_TOWNS);
  let data = await res.json();
  return {
    props: {
      // will be passed to the page component as props
      cities: data,
    },
  };
};

const Posting = ({ cities }: { cities: City[] }) => {
  const router = useRouter();
  const { status } = useSession();
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetchData(`${process.env.NEXT_PUBLIC_HOST}/api/notices`, data, 'POST').then(
      () => {
        setShowMessage(true);
        console.log('test');
      },
    );
  };

  const InputClasses =
    'bg-gray-50 appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-800 focus:bg-white ';

  return (
    <div className='flex justify-center items-center min-h-screen w-full'>
      <div className=' w-2/5 mx-auto'>
        <h1 className='text-2xl capitalize text-center font-bold'>
          posting a new offer
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Employer</label>
            <input
              className={InputClasses}
              type='text'
              {...register('employer', { required: true })}
            />
            {errors.employer?.type === 'required' && (
              <span className='text-red-300 text-sm'>
                employer fullname is required
              </span>
            )}
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
            <label>Offer</label>
            <input
              className={InputClasses}
              type='text'
              {...register('offer', { required: true })}
            />
            {errors.offer?.type === 'required' && (
              <span className='text-red-300 text-sm'>offer is required</span>
            )}
          </div>
          <div>
            <label>City</label>
            <select
              className={InputClasses}
              {...register('city', { required: true })}
            >
              {cities.map((city) => {
                return (
                  <option value={`${city.nom} - ${city.code}`} key={city.code}>
                    {`${city.nom} - ${city.code}`}
                  </option>
                );
              })}
            </select>
            {errors.city?.type === 'required' && (
              <span className='text-red-300 text-sm'>city is required</span>
            )}
          </div>
          <div>
            <label>Description</label>
            <textarea
              className={InputClasses}
              {...register('description')}
              id=''
            ></textarea>
          </div>
          <div>
            <label>Contract</label>
            <select
              className={InputClasses}
              {...register('contract', { required: true })}
              id=''
            >
              <option value='CDD'>CDD</option>
              <option value='CDI'>CDI</option>
              <option value='Stage'>Stage</option>
            </select>
          </div>
          <div className='flex justify-center space-x-10 my-5'>
            <button
              className='shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
              type='submit'
            >
              Save
            </button>
            <Link
              href='/'
              className='shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
            >
              Back
            </Link>
          </div>
        </form>
      </div>
      {showMessage && (
        <MessageModal setShowMessage={setShowMessage} showMessage={showMessage}>
          {' '}
          notice is added !{' '}
        </MessageModal>
      )}
    </div>
  );
};

export default Posting;
