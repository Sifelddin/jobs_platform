import { Notice } from '@prisma/client';
import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { upload } from '../utils/fetch_data';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  cv: FileList;
};

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  notice: Notice;
};

const ApplyModal = ({ setShowModal, notice, setShowMessage }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('noticeId', notice.id.toString());
    formData.append('cv', data.cv[0]);
    upload(`${process.env.NEXT_PUBLIC_HOST}/api/upload`, formData, 'POST').then(
      () => {
        setShowMessage(true);
        setShowModal(false);
      },
    );
  };
  const InputClasses =
    'bg-gray-50 appearance-none border-2 border-gray-200 rounded-md w-full py-2 px-4 text-gray-800 focus:bg-white ';
  return (
    <div
      onClick={() => setShowModal(false)}
      className='w-full flex justify-center items-center h-screen bg-gray-900/75 fixed top-0 right-0 left-0 bottom-0 '
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-11/12 md:w-3/5 lg:w-2/5 bg-white p-6 rounded-md z-30 '
      >
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>FirstName</label>
            <input
              className={InputClasses}
              type='text'
              {...register('firstName', { required: true })}
            />
            {errors.firstName?.type === 'required' && (
              <span className='text-red-300 text-sm'>
                employer fullname is required
              </span>
            )}
          </div>
          <div>
            <label>LastName</label>
            <input
              className={InputClasses}
              type='text'
              {...register('lastName', { required: true })}
            />
            {errors.lastName?.type === 'required' && (
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
            <label>CV</label>
            <input {...register('cv', { required: true })} type='file' />
          </div>
          <div className='w-full text-center m-1 space-x-1 md:space-x-3'>
            <button className='shadow bg-green-600 hover:bg-green-400 focus:shadow-outline focus:outline-none  md:w-2/5 text-white font-bold py-1 px-4 rounded '>
              Apply
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
              className='shadow bg-red-600 hover:bg-red-400 focus:shadow-outline focus:outline-none  md:w-2/5 text-white font-bold py-1 px-4 rounded '
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
