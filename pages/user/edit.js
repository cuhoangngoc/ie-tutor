import Layout from '../../components/Layout/Layout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GrMailOption, GrHome, GrPhone } from 'react-icons/gr';
import Button from '../../components/Button';
import Editor from '../../components/Editor';
import { useRouter } from 'next/router';
import { showErrorToast, showSuccessToast } from '../../components/Toast';

const Edit = ({ user }) => {
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')));
  const [address, setAddress] = useState(userInfo?.address);
  const [phone, setPhone] = useState(userInfo?.phone);
  const [bio, setBio] = useState(userInfo?.bio);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const handleAvatarChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const validatePhone = (event) => {
    // validate phone number, accept number only, if not number then don't accept and don't show on input
    event.target.value = event.target.value.replace(/[^\d]/, '');
  };

  const handleClick = async () => {
    // validate phone number
    if (phone && !phone.match(/^\d{10}$/)) {
      showErrorToast('Invalid phone number!');
      return;
    }

    let imageSrc = userInfo?.picture || null;
    let public_id = userInfo?.publicId || '';

    if (selectedImage) {
      const formData = new FormData();
      formData.append('file', selectedImage);
      formData.append('upload_preset', 'logistie_avatar_uploads');

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
          formData
        );
        const data = await res.data;
        imageSrc = data.secure_url;
        public_id = data.public_id;
      } catch (error) {
        console.log(error);
      }
    }

    const data = {
      address,
      phone,
      bio,
      email: user.email,
      picture: imageSrc,
      publicId: public_id,
    };

    try {
      const res = await axios.post('/api/users/update-user-info', data);

      if (res.status === 200) {
        localStorage.setItem('userInfo', JSON.stringify(res.data));
        setUserInfo(res.data);

        router.push('/user');
        showSuccessToast('Profile updated successfully!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container relative mx-auto grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 mt-16 w-full rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800">
          <div className="-mt-16 flex justify-center md:justify-start">
            <label className="cursor-pointer">
              <input
                type="file"
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              {selectedImage ? (
                <img
                  className="h-20 w-20 cursor-pointer rounded-full border-2 object-cover"
                  src={URL.createObjectURL(selectedImage)}
                  alt={user.name}
                />
              ) : (
                <img
                  className="h-20 w-20 cursor-pointer rounded-full border-2 object-cover"
                  src={userInfo?.picture}
                  alt={user.name}
                />
              )}
            </label>
          </div>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
            {user.nickname}
          </h2>

          <div className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-200">
            <GrMailOption className="h-6 w-6 fill-current" />
            <h1 className="px-2 text-sm"> {user.email}</h1>
          </div>

          <div className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-200">
            <GrHome className="h-6 w-6 fill-current" />
            <input
              type="text"
              className="max-w-[20rem] border-none px-2 text-sm"
              defaultValue={userInfo?.address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mt-4 flex items-center gap-1 text-gray-700 dark:text-gray-200">
            <GrPhone className="h-6 w-6 fill-current" />
            <input
              type="text"
              className="border-none px-2 text-sm"
              defaultValue={userInfo?.phone}
              onChange={(e) => setPhone(e.target.value)}
              onInput={validatePhone}
            />
          </div>
        </div>

        <div className="mt-16 w-full grow rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-2">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">My Bio</h1>
          <Editor getContent={(value) => setBio(value)} defaultValue={userInfo?.bio} />
        </div>

        <Button onClick={handleClick} className="max-w-[10rem] bg-primary">
          Save Changes
        </Button>
      </div>
    </Layout>
  );
};

export default withPageAuthRequired(Edit);
