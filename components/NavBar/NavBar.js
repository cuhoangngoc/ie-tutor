import { Navbar } from 'flowbite-react';
import Link from 'next/link';
const NavBar = () => {
  const navLinks = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Find tutor',
      path: '/find-tutors',
    },
    {
      title: 'About',
      path: '/about',
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
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="IE Tutor Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            IE Tutor
          </span>
        </a>
      </Link>
      <div className="flex md:order-2">
        <button className="btn bg-[#3E54AC]">
          <Link href="/find-tutors" legacyBehavior>
            <a>Get started</a>
          </Link>
        </button>

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navLinks.map(({ title, path }, index) => (
          <Link key={index} href={path} className="text-[1rem]">
            {title}
          </Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
