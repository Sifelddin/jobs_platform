import { Notice } from '@prisma/client';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import ApplyModal from '../components/ApplyModal';
import Header from '../components/Header';
import MessageModal from '../components/MessageModal';
import Details from '../components/Notices/Details';
import Offer from '../components/Notices/Offer';
import { useFetch } from '../hooks/useFetch';
import prisma from '../lib/prisma';

const Home: NextPage<{ notices: Notice[]; notice: Notice }> = ({
  notices,
  notice,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const [noticeId, setNoticeId] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const { error, data, loading } = useFetch(
    process.env.NODE_ENV === 'development' && noticeId
      ? `${process.env.NEXT_PUBLIC_HOST}/api/notices/${noticeId}`
      : '',
  );
  if (data) {
    notice = data;
  }

  return (
    <>
      <div>
        <Header />
        <div>
          <div className='bg-slate-50 p-4 text-center'>
            <h1 className='text-4xl font-semibold '>Job offers in Polynesia</h1>
          </div>
          <div className='flex justify-center bg-slate-50 space-x-10 py-6 px-2 lg:p-8'>
            <div className='flex flex-col space-y-8'>
              {notices.map((notice) => {
                return (
                  <Offer
                    notice={notice}
                    key={notice.id}
                    setNoticeId={setNoticeId}
                  />
                );
              })}
            </div>
            {(loading && (
              <div className='text-center w-2/5'>
                <p>Loading...</p>
              </div>
            )) || <Details notice={notice} setShowModal={setShowModal} />}
            {showMessage && (
              <MessageModal setShowMessage={setShowMessage}>
                {' '}
                application is sent !{' '}
              </MessageModal>
            )}
          </div>
        </div>
        {showModal && (
          <ApplyModal
            setShowMessage={setShowMessage}
            setShowModal={setShowModal}
            notice={notice}
          />
        )}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  notices: Notice[];
}> = async () => {
  let notice;
  let notices = await prisma.notice.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
  if (notices) {
    notice = await prisma.notice.findFirst({
      where: { id: notices[0].id },
    });
  }

  return {
    props: {
      notices: JSON.parse(JSON.stringify(notices)),
      notice: JSON.parse(JSON.stringify(notice)),
    }, // will be passed to the page component as props
  };
};

export default Home;
