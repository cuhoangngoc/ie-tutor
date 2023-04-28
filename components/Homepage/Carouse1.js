import React from 'react'
import Text from './Text'
import Card1 from './Card1'
import teacherimg from '../../public/imgs/home_page/teacher-img-demo.jpg'
import avatarimg from '../../public/imgs/home_page/avatar-img-demo.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button_explore from './Button_explore'

const Carouse1 = () => {
    const content = {
        sub: 'Our featured instructors',
        title: 'Every instructor is professional and highly qualified',
        content: 'Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.'
    }
    const card = {
        urlteacher: teacherimg,
        urlavatar: avatarimg,
        name: 'Jannie Echavarria',
        address: 'Phoenix, MN',
        money: '$77.00/hr',
        phone: '080027',
        whatsapp: '132414',
        qualification: 'MBBS'
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
                <Card1 urlteacher={card.urlteacher} urlavatar={card.urlavatar} name={card.name} address={card.address}
                    money={card.money} phone={card.phone} whatsapp={card.whatsapp} qualification={card.qualification}></Card1>
                <Card1 urlteacher={card.urlteacher} urlavatar={card.urlavatar} name={card.name} address={card.address}
                    money={card.money} phone={card.phone} whatsapp={card.whatsapp} qualification={card.qualification}></Card1>
                <Card1 urlteacher={card.urlteacher} urlavatar={card.urlavatar} name={card.name} address={card.address}
                    money={card.money} phone={card.phone} whatsapp={card.whatsapp} qualification={card.qualification}></Card1>
                <Card1 urlteacher={card.urlteacher} urlavatar={card.urlavatar} name={card.name} address={card.address}
                    money={card.money} phone={card.phone} whatsapp={card.whatsapp} qualification={card.qualification}></Card1>
                <Card1 urlteacher={card.urlteacher} urlavatar={card.urlavatar} name={card.name} address={card.address}
                    money={card.money} phone={card.phone} whatsapp={card.whatsapp} qualification={card.qualification}></Card1>
            </Slider>
            <div className='flex justify-center items-center mt-10'>
                <Button_explore href='/' text='Explore all instructor'></Button_explore>
            </div>
        </div>

    )
}

export default Carouse1