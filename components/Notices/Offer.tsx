import { Notice } from '@prisma/client';
import React, { Dispatch, SetStateAction } from 'react';
type Props = {
  notice: Notice;
  setNoticeId: Dispatch<SetStateAction<number | undefined>>;
};
const Offer = ({ notice, setNoticeId }: Props) => {
  return (
    <div className='border-2 p-3 rounded-lg w-72 space-y-2 shadow-md capitalize'>
      <h2 className='text-2xl font-semibold '>{notice.offer}</h2>
      <p className='text-lg'>{notice.employer}</p>
      <p>
        {notice.city} - {notice.contract}
      </p>
      <p className='text-sm'>{notice.description.slice(0, 100)}...</p>
      <button
        className='bg-slate-200 p-2 text-lg capitalize space-x-5 rounded-md font-semibold text-gray-700 hover:bg-cyan-200 duration-200 hover:text-black'
        onClick={() => setNoticeId(notice.id)}
      >
        offer details
      </button>
    </div>
  );
};

export default Offer;
