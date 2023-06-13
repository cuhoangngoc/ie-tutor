import { Navbar } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/imgs/logo/logo-500.png';
import { useUser } from '@auth0/nextjs-auth0/client';
import Spinner from '../Spinner';
import NotiBox from './NotiBox';
import { useState } from 'react';
import axios from 'axios';
import { FcVideoCall } from 'react-icons/fc';

const NavBar = () => {
  const { user, isLoading } = useUser();
  const [userProfile, setUserProfile] = useState(null);

  if (isLoading) return <Spinner />;

  (async function () {
    if (user) {
      const res = await axios.get(`/api/users/get-user-info?email=${user.email}`);
      res.status === 200 && setUserProfile(res.data);
    }
  })();

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
      title: 'Subscriptions',
      path: '/subscriptions',
    },
    {
      title: 'How it work',
      path: '/how-it-work',
    },
    {
      title: 'Contact',
      path: '/contact',
    },
    {
      title: 'Chats',
      path: '/chat',
    },
  ];

  return (
    <Navbar fluid={true} rounded={true} className="shadow-lg">
      <Link href="/" className="object-cover">
        <Image src={logo} alt="IE Tutor Logo" priority width={80} height={80} />
      </Link>
      <div className="flex md:order-2">
        {user ? (
          <div className="flex gap-5 lg:gap-10">
            <NotiBox user_id={user.sub} />

            <div className="group relative flex">
              <Link href="/user">
                <Image
                  alt=""
                  className="h-10 w-10 rounded-full ring-1 ring-violet-400 ring-offset-4 ring-offset-gray-800 dark:bg-gray-500"
                  src={userProfile?.picture}
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
                    href="/bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                    role="menuitem"
                    tabIndex="-1"
                    id="menu-item-0"
                  >
                    My bookings
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
          <button className="btn mr-2 border-none bg-primary text-white hover:bg-indigo-600">
            <Link href="/api/auth/login">Get started</Link>
          </button>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {navLinks.map(({ title, path }, index) => {
          if (!user && title === 'Chats') return null;

          if (userProfile?.is_activated && title === 'Subscriptions') return null;

          return (
            <Link key={index} href={path} className="text-[1rem] hover:text-blue-500">
              {title}
            </Link>
          );
        })}
      </Navbar.Collapse>

      {/* show video call btn if user signed in */}
      {userProfile?.is_activated && (
        <Link
          className="fixed bottom-5 right-5 z-10 rounded-full bg-primary bg-opacity-50 p-2 shadow-lg transition-all duration-200 hover:bg-opacity-30"
          href={process.env.NEXT_PUBLIC_VIDEO_CALL_URL}
          target="_blank"
        >
          <FcVideoCall size={60} />
        </Link>
      )}
    </Navbar>
  );
};

export default NavBar;
