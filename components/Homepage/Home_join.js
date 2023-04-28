import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import homeimg from '../../public/imgs/home_page/home-join.png';
import GradientBtn from '../../components/HowItWork/GradientBtn';

const Home_join = () => {
  
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-16 md:p-20 bg-[#f7f8fc]">
      <div className="m-5">
        <h1 className="md:text-[52px] text-[42px] font-bold ">
          A good <span className="text-[#1DA1F2]">#education</span> is always a
          base of
        </h1>

        <div className="bg-[#6A307D] inline-block rounded-lg p-2 my-5">
          <h1 className="text-white md:text-[52px] text-[42px] font-bold">A bright future</h1>
        </div>

        <p className='text-[#1C1C1C] text-xl'>Consectur adipiscing elitsedo eiusmod tempor incididuntem utaborate dolore magna aliqua ad minim veniamque.</p>

        <div className="my-6 flex gap-8">
          <GradientBtn href="/" text="Start as students" color="pink" />
          <GradientBtn href="/" text="Join as instructors" color="blue" />
        </div>

        <p className="text-[#676767] text-base">
          You can also join as parent to explore <a className="text-[#1DA1F2]" href='/'>Join today</a>
        </p>
      </div>
        
      <div className='md:w-full md:block hidden'>
        <Image src={homeimg} alt="Image" className=''/>
      </div>
    </div>
  );
};

export default Home_join;
