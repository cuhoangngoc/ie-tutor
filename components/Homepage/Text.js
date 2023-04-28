import React from 'react'

const Text = ({ sub, title, content }) => { 
  return (
    <div className='md:pb-8 md:px-72'>
        <img
            decoding="async"
            src="https://demos.wp-guppy.com/tuturnp/wp-content/plugins/tuturn/public/images/zigzag-line.svg"
            alt="Making ease for everyone"
            className="mx-auto mb-6"
        />
        <h4 className='text-[#1C1C1C] text-2xl text-center'>{sub}</h4>
        <h2 className='text-[#1C1C1C] font-bold md:text-[40px] text-4xl text-center md:px-24 px-5'>{title}</h2>
        <p className='text-[#1C1C1C] md:text-xl text-base text-center pt-6'>{content}</p>
    </div>
    
  )
}

export default Text