import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Header from '../components/Header';
import prisma from '../lib/prisma';

const Profile = () => {
  const router = useRouter();
  const { status, data } = useSession();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);
  return (
    <div>
      <Header />
      <div className='w-full h-screen flex flex-col justify-center items-center bg-stone-50'>
        <p> {data?.user?.name}</p>
        <br />
        <p>{data?.user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
