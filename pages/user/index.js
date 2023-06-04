import Layout from '../../components/Layout/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import askForToken from '../../lib/ask-for-token';
import axios from 'axios';
import { GrMailOption, GrHome, GrPhone, GrMoney } from 'react-icons/gr';
import UserScheduler from '../../components/UserScheduler';
import Button from '../../components/Button';
import Link from 'next/link';
import Spinner from '../../components/Spinner';
import BecomeInsModal from '../../components/User/BecomeInsModal';

const User = ({ user }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [accountType, setAccountType] = useState('Student account');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllUserInfo = async () => {
      const res = await axios.get(`/api/users/get-user-info?email=${user.email}`);

      localStorage.setItem('userInfo', JSON.stringify(res.data));
      setUserInfo(res.data);

      if (res.data.role === 0) setAccountType('Students account');
      else if (res.data.role === 1) setAccountType('Instructors account');
      else setAccountType('Admins account');

      setIsLoading(false);
    };
    getAllUserInfo();
  }, [user.email]);

  const fakeData = [
    {
      title: 'Website Re-Design Plan',
      startDate: new Date(2018, 6, 25, 9, 35),
      endDate: new Date(2018, 6, 25, 11, 30),
      id: 0,
      rRule: 'FREQ=DAILY;COUNT=3',
      exDate: '20180628T063500Z,20180626T063500Z',
    },
    {
      title: 'Book Flights to San Fran for Sales Trip',
      startDate: new Date(2018, 6, 25, 12, 11),
      endDate: new Date(2018, 6, 25, 13, 0),
      id: 1,
      rRule: 'FREQ=DAILY;COUNT=4',
      exDate: '20180627T091100Z',
    },
    {
      title: 'Install New Router in Dev Room',
      startDate: new Date(2018, 6, 25, 13, 30),
      endDate: new Date(2018, 6, 25, 14, 35),
      id: 2,
      rRule: 'FREQ=DAILY;COUNT=5',
    },
  ];

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

          {/* Hiển thị lương theo giờ đối với intructor */}
          {userInfo?.role === 1 && (
            <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
              <GrMoney className="h-6 w-6 fill-current" />
              <h1 className="px-2 text-sm"> {userInfo?.hourly_wage} $/hour</h1>
            </div>
          )}

          <div className="my-4 flex items-center text-gray-700 dark:text-gray-200">
            <h1 className="text-sm">
              You signed in with <strong>{accountType}</strong>
            </h1>
          </div>

          {/* Nếu là tài khoản studen thì hiển thị chức năng yêu đăng ký tài khoản instructor, không hiển thị đối với tài khoản admin và instructor*/}
          {userInfo?.role === 0 && <BecomeInsModal user_id={userInfo?._id} />}

          <Button className="float-right bg-primary">
            <Link href="/user/edit">Edit Profile</Link>
          </Button>
        </div>

        <div className="mt-16 w-full grow rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-2">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">My Bio</h1>
          <div dangerouslySetInnerHTML={{ __html: userInfo?.bio }}></div>
        </div>

        <div className="mt-16 w-full rounded-lg bg-[#F0F0F0] px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-3">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">My schedule</h1>
          <UserScheduler appointments={fakeData} />
        </div>
      </div>
    </Layout>
  );
};

export default withPageAuthRequired(User);
