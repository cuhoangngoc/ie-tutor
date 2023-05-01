import Layout from '../../components/Layout/Layout';
import Card from '../../components/HowItWork/Card';
import Hero from '../../components/HowItWork/Hero';
import GradientBtn from '../../components/HowItWork/GradientBtn';
import CardSide from '../../components/HowItWork/CardSide';
import Image from 'next/image';

import UmbrellaIcon from '../../public/imgs/logo/umbrella-100.png';
import ProtectIcon from '../../public/imgs/logo/protect-100.png';
import WinkIcon from '../../public/imgs/logo/wink-100.png';

HowItWork.title = 'How It Work';
HowItWork.description =
  'This page provides information about how the platform work';

export default function HowItWork() {
  // Các bước sử dụng dịch vụ
  const steps = [
    {
      stepNumber: 1,
      title: 'Post a tuition job',
      description:
        'Aeccusamus et iusto odiomae dignissimos ducimus quistames blanditiis praesentium voluptatum loramkes anuten.',
      color: 'orange',
      img: 'https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/04/img-01.jpg',
      alt: 'How it work - Step 1',
    },
    {
      stepNumber: 2,
      title: 'Hire your best match',
      description:
        'Aeccusamus et iusto odiomae dignissimos ducimus quistames blanditiis praesentium voluptatum loramkes anuten.',
      color: 'purple',
      img: 'https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/04/img-02-1.jpg',
      alt: 'How it work - Step 2',
    },
    {
      stepNumber: 3,
      title: 'Get it done on time',
      description:
        'Aeccusamus et iusto odiomae dignissimos ducimus quistames blanditiis praesentium voluptatum loramkes anuten.',
      color: 'green',
      img: 'https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/04/img-03.jpg',
      alt: 'How it work - Step 3',
    },
  ];

  // Lợi ích của dịch vụ
  const cardItems = [
    {
      imgSrc: UmbrellaIcon.src,
      title: 'User friendly hiring process',
      description:
        'accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
    },
    {
      imgSrc: ProtectIcon.src,
      title: 'Verified process with ease',
      description:
        'accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
    },
    {
      imgSrc: WinkIcon.src,
      title: 'Secure payment gateway integrated',
      description:
        'accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
    },
  ];

  const firstHero = {
    subTitle: 'Making ease for everyone',
    mainTitle: 'We made it in easy way',
    description:
      'accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
  };

  const secondHero = {
    subTitle: 'We guarantee quality process',
    mainTitle: "Let's join our community today",
    description:
      'accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident',
  };

  return (
    <Layout>
      {/* Hướng dẫn sử dụng dịch vụ */}
      <section className="container mx-auto mt-[2rem]">
        <Hero hero={firstHero} />

        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          {steps.map((step, i) => (
            <Card key={i} step={step} />
          ))}
        </div>
      </section>

      {/* Lợi ích của dịch vụ */}
      <section className="my-20 grid grid-cols-1 gap-4 bg-[url('https://demos.wp-guppy.com/tuturnp/wp-content/uploads/2022/02/img-04-1.jpg')] bg-fixed bg-no-repeat lg:grid-cols-2">
        <div className="hidden lg:block"></div>
        <div className="bg-white px-8">
          <img
            decoding="async"
            src="https://demos.wp-guppy.com/tuturnp/wp-content/plugins/tuturn/public/images/zigzag-line.svg"
            alt="Making ease for everyone"
            className="mb-6"
          />
          <h4 className="sub-title">Why our working is so unique</h4>
          <h2 className="text-3xl font-bold md:text-4xl">
            See how our working process easily adapt your need
          </h2>

          <div className="lg-flex-row flex flex-col items-center">
            {cardItems.map((cardItem, i) => (
              <CardSide key={i} cardItem={cardItem} />
            ))}
          </div>
        </div>
      </section>

      {/* Cho người dùng tùy chọn tham gia dưới dạng Student hoặc Instructor */}
      <section className="container mx-auto mb-20">
        <Hero hero={secondHero} />

        <div className="mx-2 flex justify-center gap-6">
          <GradientBtn href="/" text="Start as students" color="pink" />
          <GradientBtn href="/" text="Join as instructors" color="blue" />
        </div>
      </section>
    </Layout>
  );
}
