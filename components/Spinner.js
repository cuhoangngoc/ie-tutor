import React from 'react';
import Lottie from 'lottie-react';
import * as Loader from '../public/loading.json';

const Spinner = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-transparent">
        <div className="h-[7rem] w-[7rem] md:h-[15rem] md:w-[15rem]">
          <Lottie animationData={Loader} loop={true} />
        </div>
      </div>
    </>
  );
};

export default Spinner;
