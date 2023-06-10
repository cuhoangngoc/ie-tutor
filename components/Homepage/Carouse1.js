import React, { useState, useEffect } from 'react'
import Text from './Text'
import Card1 from './Card1'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button_explore from './Button_explore'

const Carouse1 = ({ instructors }) => {
    const [allTutor, setAllTutor] = useState([]);
    
    useEffect(() => {
        setAllTutor(instructors);
    }, [instructors]);
    console.log(allTutor)

    const content = {
        sub: 'Our featured instructors',
        title: 'Every instructor is professional and highly qualified',
        content: 'Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.'
    }
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 768, // Kích thước màn hình để thay đổi hiển thị
                settings: {
                    slidesToShow: 1, // Hiển thị 1 ảnh mỗi lần trượt
                    slidesToScroll: 1
                }
            }
        ]
    };
    
    return (
        <div className='md:p-20 p-2'>
            <Text sub={content.sub} title={content.title} content={content.content}></Text>
            <Slider {...settings}>
                {allTutor && allTutor.map((data, key) => <Card1 key={key} urlteacher={data.picture} urlavatar={data.picture} name={data.username} address={data.address}
                    money={data.hourlyWage} phone={data.phone} email={data.email} rating={data.rating}></Card1>)}
            </Slider>

            <div className='flex justify-center items-center mt-10'>
                <Button_explore href='/find-instructors' text='Explore all instructor'></Button_explore>
            </div>
        </div>

    )
}

export default Carouse1