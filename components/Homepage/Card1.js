import React from 'react'
import Image from 'next/image'
import {AiOutlineCheckCircle} from 'react-icons/ai'

const Card1 = ({ urlteacher, urlavatar, name, address, money, phone, whatsapp, qualification }) => {

  return (
    <div className="m-4 rounded-md border">
      <Image src={urlteacher} alt=""></Image>
      <div className="p-5">
        <div className="flex flex-row">
          <Image
            src={urlavatar}
            height={46}
            width={46}
            className="mr-3 rounded-full"
            alt=""
          />
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
            <p>Starting from:</p>
            <p>Mobile:</p>
            <p>Whatsapp:</p>
            <p>Qualification:</p>
          </div>
          <div className="flex-1 justify-end text-end text-lg font-bold text-[#484848]">
            <em>{money}</em>
            <br />
            <em>{phone}</em>
            <br />
            <em>{whatsapp}</em>
            <br />
            <em>{qualification}</em>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card1