import React from 'react';
import Image from 'next/image';
import courseimg from '../../public/imgs/home_page/course-img.png';
import jobimg from '../../public/imgs/home_page/job-img.png';
import timeimg from '../../public/imgs/home_page/time-img.png';
import userimg from '../../public/imgs/home_page/user-img.png';

const Card = () => {
    const content = [
        {
            title: '560,616',
            decription: 'Courses available for verified and top tutors',
            url: courseimg,
            alt: 'number count'
        },
        {
            title: '648,482',
            decription: 'Total tuition job posted on the platform till date',
            url: jobimg,
            alt: 'number job'
        },
        {
            title: '20+ Hours',
            decription: 'User daily average time spent on the platform',
            url: timeimg,
            alt: 'number time'
        },
        {
            title: '7+ Million',
            decription: 'Active instructor and students available on the platform',
            url: userimg,
            alt: 'number user'
        },
    ];

    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-4 bg-[#f7f8fc] p-2 md:gap-7 md:p-20">
        {content.map((content, i) => (
          <div
            className="col-span-2 row-span-1 rounded-lg bg-[#FFFFFF] p-5 md:col-span-1"
            key={i}
          >
            <div className="flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F7F8FC]">
                <Image
                  src={content.url}
                  alt={content.alt}
                  height={50}
                  width={50}
                ></Image>
              </div>
              <div className="flex flex-1 flex-col px-4 py-2">
                <span className="text-2xl font-bold">{content.title}</span>
                <p className="text-lg text-gray-700">{content.decription}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
};

export default Card;
