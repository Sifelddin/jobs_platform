import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
type Props = {
  setShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  showMessage: boolean;
  children: ReactNode;
};
const MessageModal = ({ setShowMessage, showMessage, children }: Props) => {
  const router = useRouter();
  let modalBg =
    'w-full h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-20 outline-none focus:outline-none bg-no-repeat bg-center bg-cover ';
  let modalClasses =
    'w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white z-50 transition-all ease-in-out duration-300';

  const hundleClick = () => {
    setShowMessage(false);
    router.replace('/');
  };

  if (showMessage) {
    modalBg += ' z-20';
    modalClasses += ' translate-y-5 opacity-1 bg-green-200';
  } else {
    modalBg += ' -z-20 ';
    modalClasses += ' translate-y-0 opacity-0';
  }
  let messageClasses =
    'text-center p-2 flex-auto justify-center rounded-md shadow-md ';

  return (
    <div
      style={{ margin: 0 }}
      onClick={hundleClick}
      role='presentation'
      className={modalBg}
    >
      <div className='absolute bg-black opacity-70 inset-0 z-0 ' />
      <div
        onClick={(e) => e.stopPropagation()}
        role='presentation'
        className={modalClasses}
      >
        <div className={messageClasses}>
          <h2 className='text-xl font-bold py-2 text-gray-900 '>{children}</h2>
        </div>
        <div className='p-3 mt-2 text-center space-x-4 flex justify-around items-center '>
          <button
            onClick={hundleClick}
            className='px-10 py-3 bg-blue-400 hover:bg-blue-700 border border-transparent rounded-md font-bold text-sm text-white uppercase tracking-widest focus:outline-none focus:border-gray-100 focus:ring ring-gray-100 disabled:opacity-25 transition ease-in-out duration-150 w-onRemovefit'
          >
            ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
