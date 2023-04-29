import Layout from '../../components/Layout/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import askForToken from '../../lib/ask-for-token';
import axios from 'axios';
import { GrMailOption, GrHome, GrPhone } from 'react-icons/gr';
import UserScheduler from '../../components/UserScheduler';
import Button from '../../components/Button';
import Link from 'next/link';
import Spinner from '../../components/Spinner';

const User = ({ user }) => {
  const [token, setToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [accountType, setAccountType] = useState('Student account');
  const [isLoading, setIsLoading] = useState(true);

  // Lấy authorized token từ Auth0 thao tác với Auth0 Management API
  // useEffect(() => {
  //   const getAllUserInfo = async () => {
  //     const token = await askForToken();
  //     setToken(token);

  //     const options = {
  //       method: 'GET',
  //       url: `https://uit.au.auth0.com/api/v2/users/${user.sub}`,
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     const response = await axios.request(options);
  //     setUserInfo(response.data);
  //     console.log(userInfo);
  //   };
  //   getAllUserInfo();
  // }, []);

  useEffect(() => {
    const getAllUserInfo = async () => {
      const res = await axios.get(
        `/api/users/get-user-info?email=${user.email}`
      );

      localStorage.setItem('userInfo', JSON.stringify(res.data));
      setUserInfo(res.data);

      if (userInfo?.role === 0) setAccountType('Students account');
      else if (userInfo?.role === 1) setAccountType('Instructors account');
      else setAccountType('Admins account');

      setIsLoading(false);
    };
    getAllUserInfo();
  }, [userInfo, user.email]);

  if (isLoading) return <Spinner />;

  return (
    <Layout>
      {/* Grid layout tỉ lệ 1:2 */}
      <div className="container relative mx-auto grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 mt-16 w-full rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800">
          <div className="-mt-16 flex justify-center md:justify-start">
            <Image
              className="h-20 w-20 rounded-full border-2 object-cover"
              src={user.picture}
              alt={user.name}
              width={100}
              height={100}
            />
          </div>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
            {user.nickname}
          </h2>

          <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
            <GrMailOption className="h-6 w-6 fill-current" />
            <h1 className="px-2 text-sm"> {user.email}</h1>
          </div>

          {/* Nếu có thông tin địa chỉ thì hiển thị */}
          {userInfo?.address && (
            <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
              <GrHome className="h-6 w-6 fill-current" />
              <h1 className="px-2 text-sm"> {userInfo?.address}</h1>
            </div>
          )}

          {/* Nếu có thông tin số điện thoại thì hiển thị */}
          {userInfo?.phone && (
            <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
              <GrPhone className="h-6 w-6 fill-current" />
              <h1 className="px-2 text-sm"> {userInfo?.phone}</h1>
            </div>
          )}

          <div className="my-4 flex items-center text-gray-700 dark:text-gray-200">
            <h1 className="text-sm">
              You signed in with <strong>{accountType}</strong>
            </h1>
          </div>

          <Button className="float-right bg-primary">
            <Link href="/user/edit">Edit Profile</Link>
          </Button>
        </div>

        <div className="mt-16 w-full grow rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-2">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
            My Bio
          </h1>
          <div dangerouslySetInnerHTML={{ __html: userInfo?.bio }}></div>
        </div>

        <div className="mt-16 w-full rounded-lg bg-[#F0F0F0] px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-3">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
            My schedule
          </h1>
          <UserScheduler />
        </div>
      </div>
    </Layout>
  );
};

export default withPageAuthRequired(User);
