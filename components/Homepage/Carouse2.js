import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button_explore from './Button_explore';
import Text from './Text'
import Card2 from './Card2';
import Roboturl from '../../public/imgs/home_page/robot-img-demo.jpg'


const Carouse2 = () => {
  const content = {
    sub: 'Let’s make a quick start today',
    title: 'Choose from the top visited categories you may like',
    content: 'Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores etmquasa molestias epturi sint occaecati cupiditate non providente mikume molareshe.'
  }
  const card = {
    url: Roboturl,
    title: 'Primary',
    content: '46 Listings'
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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
        <Card2 urlimg={card.url} title={card.title} content={card.content}></Card2>
        <Card2 urlimg={card.url} title={card.title} content={card.content}></Card2>
        <Card2 urlimg={card.url} title={card.title} content={card.content}></Card2>
        <Card2 urlimg={card.url} title={card.title} content={card.content}></Card2>
        <Card2 urlimg={card.url} title={card.title} content={card.content}></Card2>
        <Card2 urlimg={card.url} title={card.title} content={card.content}></Card2>
        <Card2 urlimg={card.url} title={card.title} content={card.content}></Card2>
        <Card2 urlimg={card.url} title={card.title} content={card.content}></Card2>
      </Slider>
      <div className='flex justify-center items-center mt-10'>
        <Button_explore href='/' text='Explore all categories'></Button_explore>
      </div>
    </div>
  )
}

export default Carouse2