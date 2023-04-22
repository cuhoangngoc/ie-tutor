import React from 'react';

const Hero = ({ hero: { subTitle, mainTitle, description } }) => {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="w-full md:max-w-[70%]">
          <img
            decoding="async"
            src="https://demos.wp-guppy.com/tuturnp/wp-content/plugins/tuturn/public/images/zigzag-line.svg"
            alt="Making ease for everyone"
            className="mx-auto mb-6"
          />
          <h4 className="sub-title">{subTitle}</h4>
          <h2 className="text-3xl font-bold md:text-4xl">{mainTitle}</h2>
          <p className="py-4">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
