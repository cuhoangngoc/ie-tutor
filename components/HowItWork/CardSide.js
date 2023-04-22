import React from 'react';

const CardSide = ({ cardItem: { imgSrc, title, description } }) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg md:max-w-xl md:flex-row">
      <img className="rounded-full" src={imgSrc} />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CardSide;
