import { Navbar } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/imgs/logo/logo-100.png';

const NavBar = () => {
  const navLinks = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Find instructors',
      path: '/find-instructors',
    },
    {
      title: 'How it work',
      path: '/how-it-work',
    },
    {
      title: 'Contact',
      path: '/contact',
    },
  ];

  return (
    <Navbar fluid={true} rounded={true} className="mb-[2rem] shadow-lg">
      <Link href="/" legacyBehavior>
        <a className="flex">
          <Image
            src={logo}
            className="mr-3 w-16"
            alt="IE Tutor Logo"
            priority
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            IE Tutor
          </span>
        </a>
      </Link>
      <div className="flex md:order-2">
        <button className="btn mr-2 border-none bg-primary text-black hover:bg-indigo-600 hover:text-white">
          <Link href="/find-instructors" legacyBehavior>
            <a>Get started</a>
          </Link>
        </button>

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navLinks.map(({ title, path }, index) => (
          <Link
            key={index}
            href={path}
            className="text-[1rem] hover:text-blue-500"
          >
            {title}
          </Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
