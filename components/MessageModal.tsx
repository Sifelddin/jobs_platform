import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
type Props = {
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};
const MessageModal = ({ setShowMessage, children }: Props) => {
  const router = useRouter();
  return (
    <div className='text-center p-2 flex justify-between items-center fixed top-5 bg-green-500 z-50 text-white rounded-lg w-3/5 '>
      <h2 className='text-lg font-bold py-1 px-2 '>{children}</h2>
      <button
        onClick={() => {
          setShowMessage(false);
          router.replace('/');
        }}
        className='py-1 px-2 bg-slate-100 text-lg shadow-md text-black rounded-lg'
      >
        OK
      </button>
    </div>
  );
};

export default MessageModal;
