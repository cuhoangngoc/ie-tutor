import Layout from '../../components/Layout/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import askForToken from '../../lib/ask-for-token';
import axios from 'axios';
import { GrMailOption, GrHome, GrPhone } from 'react-icons/gr';
import Button from '../../components/Button';
import Editor from '../../components/Editor';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const Edit = ({ user }) => {
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem('userInfo'))
  );
  const [address, setAddress] = useState(userInfo?.address);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [bio, setBio] = useState(userInfo?.bio);

  const router = useRouter();

  const handleClick = async () => {
    const data = {
      address,
      phone,
      bio,
      email: user.email,
    };

    const res = await axios.post('/api/users/update-user-info', data);

    if (res.status === 200) {
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      setUserInfo(res.data);

      // redirect to profile page with router
      router.push('/user');
      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

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

          <div className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-200">
            <GrMailOption className="h-6 w-6 fill-current" />
            <h1 className="px-2 text-sm"> {user.email}</h1>
          </div>

          {/* Nếu có thông tin địa chỉ thì hiển thị */}
          {userInfo?.address && (
            <div className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-200">
              <GrHome className="h-6 w-6 fill-current" />
              <input
                type="text"
                className="max-w-[20rem] border-none px-2 text-sm"
                defaultValue={userInfo?.address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          )}

          {/* Nếu có thông tin số điện thoại thì hiển thị */}
          {userInfo?.phone && (
            <div className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-200">
              <GrPhone className="h-6 w-6 fill-current" />
              <input
                type="text"
                className="border-none px-2 text-sm"
                defaultValue={userInfo?.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="mt-16 w-full grow rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-2">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">
            My Bio
          </h1>
          <Editor
            getContent={(value) => setBio(value)}
            defaultValue={userInfo?.bio}
          />
        </div>

        <Button onClick={handleClick} className="max-w-[10rem] bg-primary">
          Save Changes
        </Button>
      </div>
    </Layout>
  );
};

export default withPageAuthRequired(Edit);
