import React from 'react';
import Image from 'next/image';
import Allenimg from '../../public/imgs/home_page/pexels-julia-m-cameron-4145038.jpg'; // Import using relative path
import Button_explore from './Button_explore';
import dottedbg from "../../public/imgs/home_page/dotted-background.png"

const CEO_Allen = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-16 md:p-20 p-2">
      <div className="m-5">
        <img
            decoding="async"
            src="https://demos.wp-guppy.com/tuturnp/wp-content/plugins/tuturn/public/images/zigzag-line.svg"
            alt="Making ease for everyone"
            className="mb-6"
        />
        <h4 className='text-[#1C1C1C] text-xl my-4'>Better Learning. Better Results</h4>

        <h2 className='text-[#1C1C1C] text-4xl font-bold my-4'>Online education platform that fits for everyone</h2>

        <p className='text-[#1C1C1C] text-lg my-4'>Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.</p>

        <div className='my-10'>
          <Button_explore href="/how-it-work" text="Explore more about us >"/>
        </div>
        
      </div>

      <div className=''>
        <Image src={Allenimg} alt="Image" className='w-3/3 h-auto'/>
      </div>
      
    </div>
  );
};

export default CEO_Allen;
