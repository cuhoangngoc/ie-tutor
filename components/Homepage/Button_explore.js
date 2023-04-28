import React from 'react'
import Link from 'next/link';

const Button_explore = ({ text, href }) => {
    return (
        <Link
            href={href}
            className={`bg-[#6a307d] rounded-md py-3 px-7 text-xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
        >
            {text}
        </Link>

    )
}

export default Button_explore