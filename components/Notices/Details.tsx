import { Notice } from '@prisma/client';
import React, { Dispatch, SetStateAction } from 'react';
type Props = {
  notice: Notice;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};
const Details = ({ notice, setShowModal }: Props) => {
  return (
    <div className=' w-2/5 p-2 shadow-md border-2 rounded-lg h-screen capitalize sticky top-2 '>
      <div className='bg-slate-100 p-2 shadow-md'>
        <h1 className='text-3xl'>{notice.offer}</h1>
        <p>{notice.createdAt.toString().slice(0, 10)}</p>
        <p>{notice.employer}</p>
        <p>
          {notice.contract} - {notice.city}
        </p>
        <div className='w-full text-center m-1'>
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
            className='shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none w-3/5 lg:w-2/5 text-white font-bold py-1 px-4 rounded '
          >
            Apply
          </button>
        </div>
      </div>
      <div className='overflow-y-scroll h-4/6'>
        <p>{notice.description}</p>
      </div>
    </div>
  );
};

export default Details;
