import React from 'react'
import Image from 'next/image'

const Card2 = ({urlimg, title, content }) => {
    return (
        <div className="relative m-4" >
            <Image src={urlimg} className='rounded-md'></Image>
            <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{title}</h3>
                <p className="text-base">{content}</p>
            </div>
        </div>
    )
}

export default Card2