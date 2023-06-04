import { Navbar } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/imgs/logo/logo-100.png';
import { useUser } from '@auth0/nextjs-auth0/client';
import Spinner from '../Spinner';
import NotiBox from './NotiBox';

const NavBar = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;

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
      title: 'Detail',
      path: '/instructor-detail',
    },
    {
      title: 'Contact',
      path: '/contact',
    },
    {
      title:'Chats',
      path:'/chat'
    },
  ];

  return (
    <Navbar fluid={true} rounded={true} className="shadow-lg">
      <Link href="/" legacyBehavior>
        <a className="flex">
          <Image src={logo} className="mr-3 w-16" alt="IE Tutor Logo" priority />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            IE Tutor
          </span>
        </a>
      </Link>
      <div className="flex md:order-2">
        {user ? (
          <div className="flex gap-5 lg:gap-10">
            <NotiBox user_id={user.sub} />

            <div className="group relative flex">
              <Link href="/user">
                <Image
                  alt=""
                  className="rounded-full ring-1 ring-violet-400 ring-offset-4 ring-offset-gray-800 dark:bg-gray-500"
                  src={user.picture}
                  width={40}
                  height={40}
                />
              </Link>

              <div
                className="absolute right-0 z-10 hidden w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none group-hover:block"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <p className="block px-4 py-2 text-sm text-gray-700">
                    <strong>{user.email}</strong>
                  </p>
                  <hr />
                  <Link
                    href="/user"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    Profile
                  </Link>
                  <hr />
                  <Link
                    href="/api/auth/logout"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button className="btn mr-2 border-none bg-primary text-black hover:bg-indigo-600 hover:text-white">
            <Link href="/api/auth/login">Get started</Link>
          </button>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navLinks.map(({ title, path }, index) => (
          <Link key={index} href={path} className="text-[1rem] hover:text-blue-500">
            {title}
          </Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
