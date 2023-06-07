import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { Footer } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/imgs/logo/logo-100.png';

const AppFooter = () => {
  const navLinks = [
    {
      group: 'Services',
      links: [
        {
          title: 'Finding instructors',
          path: '/find-instructors',
        },
      ],
    },
    {
      group: 'Company',
      links: [
        {
          title: 'About us',
          path: '/about',
        },
        {
          title: 'Contact',
          path: '/contact',
        },
      ],
    },
    {
      group: 'Legal',
      links: [
        {
          title: 'Terms of use',
          path: '/terms',
        },

        {
          title: 'Privacy policy',
          path: '/privacy',
        },

        {
          title: 'Cookie policy',
          path: '/cookie',
        },
      ],
    },
  ];

  const social = [
    {
      icon: FaFacebook,
      url: 'https://www.facebook.com',
    },
    {
      icon: FaYoutube,
      url: 'https://www.youtube.com',
    },
  ];
  return (
    <>
      <Footer container={true} className="!bg-[#EEEEEE]">
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div>
              <Link href="/" legacyBehavior>
                <a className="flex">
                  <Image src={logo} className="mr-3 w-16" alt="IE Tutor Logo" priority />
                  <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    IE Tutor
                  </span>
                </a>
              </Link>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                IE Tutor is a platform that connects students with tutors. We provide a platform for
                tutors to advertise their services and for students to find tutors.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              {navLinks.map(({ group, links }, index) => (
                <div key={index}>
                  <Footer.Title title={group} />
                  <Footer.LinkGroup col={true}>
                    {links.map(({ title, path }, i) => (
                      <Footer.Link key={i} href={path}>
                        {title}
                      </Footer.Link>
                    ))}
                  </Footer.LinkGroup>
                </div>
              ))}
            </div>
          </div>
          <Footer.Divider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright href="/" by="IE Tutor" year={2023} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              {social.map(({ icon, url }, index) => (
                <Footer.Icon key={index} href={url} icon={icon} />
              ))}
            </div>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default AppFooter;
