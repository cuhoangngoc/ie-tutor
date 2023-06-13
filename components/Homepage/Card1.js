import React from 'react';
import Image from 'next/image';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import avatardefault from '../../public/imgs/home_page/defaultavatarimg.jpg'
import Link from 'next/link'

const Card1 = ({ urlteacher, urlavatar, name, address, money, phone, email, rating }) => {
  return (
    <Link href={`/find-instructors/${email}`}>
    <div className="m-4 rounded-md border">
    {urlteacher !== "" ? <Image src={urlteacher} alt={email} width={350} height={200}></Image>
      : <Image src={avatardefault} alt={email} width={350} height={200}></Image>}
    <div className="p-5">
      <div className="flex flex-row items-center gap-2">
        {urlavatar !== "" ? <Image
          src={urlavatar}
          width={100}
          height={100}
          className="h-[4rem] w-[4rem] justify-between rounded-full"
          alt={email}
        /> :
          <Image
            src={avatardefault}
            width={100}
            height={100}
            className="h-[4rem] w-[4rem] justify-between rounded-full"
            alt={email}
          />}

        <div className="">
          <h5 className="flex flex-row items-center">
            <a className="text-xl font-bold">{name}</a>
            <AiOutlineCheckCircle className="ml-3"></AiOutlineCheckCircle>
          </h5>
          <span className="text-base text-[#484848]">{address}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-row">
        <div className="flex-1 text-lg text-[#484848]">
          <p>Phone:</p>
          <p>Email:</p>
          <p>Rating:</p>
        </div>
        <div className="flex-1 justify-end text-end text-lg font-bold text-[#484848]">
          <em>{phone !== '' ? phone : 'No phone yet'}</em>
          <br />
          <em>{email}</em>
          <br />
          <em>{rating > 0 ? rating : 'No rating yet'}</em>
          <br />
        </div>
      </div>
    </div>
  </div>
    </Link>
    
  );
};

export default Card1;
