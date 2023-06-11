import Layout from '../../components/Layout/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GrMailOption, GrHome, GrPhone, GrMoney } from 'react-icons/gr';
import UserScheduler from '../../components/UserScheduler';
import Button from '../../components/Button';
import Link from 'next/link';
import BecomeInsModal from '../../components/User/BecomeInsModal';
import { getSession } from '@auth0/nextjs-auth0';

const User = ({ user, userProfile, bookings }) => {
  // const [userInfo, setUserInfo] = useState(null);
  const [accountType, setAccountType] = useState('Student account');

  useEffect(() => {
    if (userProfile.role === 0) setAccountType('Student account');
    else if (userProfile.role === 1) setAccountType('Instructor account');
    else setAccountType('Admin account');
  }, [userProfile.role]);

  return (
    <Layout>
      {/* Grid layout tỉ lệ 1:2 */}
      <div className="container relative mx-auto grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 mt-16 w-full rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800">
          <div className="-mt-16 flex justify-center md:justify-start">
            <Image
              className="h-20 w-20 rounded-full border-2 object-cover"
              src={userProfile.picture}
              alt={userProfile.username}
              width={100}
              height={100}
            />
          </div>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
            {userProfile.username}
          </h2>

          <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
            <GrMailOption className="h-6 w-6 fill-current" />
            <h1 className="px-2 text-sm"> {user.email}</h1>
          </div>

          {/* Nếu có thông tin địa chỉ thì hiển thị */}
          {userProfile.address && (
            <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
              <GrHome className="h-6 w-6 fill-current" />
              <h1 className="px-2 text-sm"> {userProfile.address}</h1>
            </div>
          )}

          {/* Nếu có thông tin số điện thoại thì hiển thị */}
          {userProfile.phone && (
            <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
              <GrPhone className="h-6 w-6 fill-current" />
              <h1 className="px-2 text-sm"> {userProfile.phone}</h1>
            </div>
          )}

          {/* Hiển thị lương theo giờ đối với intructor */}
          {userProfile.role === 1 && (
            <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
              <GrMoney className="h-6 w-6 fill-current" />
              <h1 className="px-2 text-sm"> {userProfile.hourly_wage} $/hour</h1>
            </div>
          )}

          <div className="my-4 flex items-center text-gray-700 dark:text-gray-200">
            <h1 className="text-sm">
              You signed in with <strong>{accountType}</strong>
            </h1>
          </div>

          {/* Nếu là tài khoản studen thì hiển thị chức năng yêu đăng ký tài khoản instructor, không hiển thị đối với tài khoản admin và instructor*/}
          {userProfile.role === 0 && <BecomeInsModal user_id={userProfile._id} />}

          <Button className="float-right bg-primary">
            <Link href="/user/edit">Edit Profile</Link>
          </Button>
        </div>

        <div className="mt-16 w-full grow rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-2">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">My Bio</h1>
          <div dangerouslySetInnerHTML={{ __html: userProfile.bio }}></div>
        </div>

        <div className="mt-16 w-full rounded-lg bg-[#F0F0F0] px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-3">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">My schedule</h1>
          <UserScheduler bookings={bookings} />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context.req, context.res);
  const user = session.user;

  if (!user)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  // get user info
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-user-info?email=${user.email}`
  );

  const id = user.sub.split('|')[1];
  const insBookings = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/bookings/approved/${id}`
  );

  return {
    props: {
      userProfile: res.data,
      bookings: insBookings.data,
    },
  };
}

export default withPageAuthRequired(User);
