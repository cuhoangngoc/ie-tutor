import React from 'react';
import Image from 'next/image';
import homeimg from '../../public/imgs/home_page/homepage img.png';
import GradientBtn from '../../components/HowItWork/GradientBtn';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Spinner from '../Spinner';

const Home_join = () => {
  const { user, isLoading } = useUser();

  return (
    <div className="grid grid-cols-1 gap-16 bg-[#f7f8fc] md:grid-cols-2 md:p-20">
      <div className="m-5">
        <h1 className="text-[42px] font-bold md:text-[52px] ">
          A good <span className="text-[#1DA1F2]">#education</span> is always a
          base of
        </h1>

        <div className="my-5 inline-block rounded-lg bg-[#6A307D] p-2">
          <h1 className="text-[42px] font-bold text-white md:text-[52px]">
            A bright future
          </h1>
        </div>

        <p className="text-xl text-[#1C1C1C]">
          Consectur adipiscing elitsedo eiusmod tempor incididuntem utaborate
          dolore magna aliqua ad minim veniamque.
        </p>

        {Boolean(user) || (
          <>
            <div className="my-6 flex gap-8">
              <GradientBtn href="/api/auth/login" text="Start as students" color="pink" />
              <GradientBtn href="/api/auth/login" text="Join as instructors" color="blue" />
            </div>
            <p className="text-base text-[#676767]">
              You can also join as parent to explore{' '}
              <Link className="text-[#1DA1F2]" href="/api/auth/login">
                Join today
              </Link>
            </p>
          </>
        )}




      </div>

      <div className="hidden md:block md:w-full">
        <Image src={homeimg} alt="Image" className="" />
      </div>
    </div>
  );
};

export default Home_join;
