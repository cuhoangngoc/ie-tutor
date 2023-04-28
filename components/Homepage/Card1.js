import React from 'react'
import Image from 'next/image'
import {AiOutlineCheckCircle} from 'react-icons/ai'

const Card1 = ({ urlteacher, urlavatar, name, address, money, phone, whatsapp, qualification }) => {

  return (
    <div className='border rounded-md m-4'>
      <Image src={urlteacher}></Image>
      <div className='p-5'>
        <div className='flex flex-row'>
          <Image src={urlavatar} height={46} width={46} className='rounded-full mr-3'/>
          <div className=''>
            <h5 className='flex flex-row items-center'>
              <a className='text-xl font-bold'>{name}</a>
              <AiOutlineCheckCircle className='ml-3'></AiOutlineCheckCircle>
            </h5>
            <span className='text-[#484848] text-base'>{address}</span>
          </div>
        </div>

        <div className='flex flex-row mt-5'>
          <div className='flex-1 text-lg text-[#484848]'>
            <p>Starting from:</p>
            <p>Mobile:</p>
            <p>Whatsapp:</p>
            <p>Qualification:</p>
          </div>
          <div className='flex-1 text-lg text-[#484848] font-bold text-end justify-end'>
            <em>{money}</em><br/>
            <em>{phone}</em><br/>
            <em>{whatsapp}</em><br/>
            <em>{qualification}</em><br/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card1