import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import UserScheduler from '../../components/UserScheduler';
import EditableSchedule from '../../components/EditableSchedule';
import Image from 'next/image';
import { GrMailOption, GrHome, GrPhone, GrMoney } from 'react-icons/gr';
import ReviewCard from '../../components/Reviews/ReviewCard';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { AiFillStar } from 'react-icons/ai';
import Spinner from '../../components/Spinner';

const InstructorPage = ({ insProfile, insRating, reviews, bookings }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  if (error) return <div>{error.message}</div>;
  return (
    <Layout>
      {/* Grid layout tỉ lệ 1:2 */}
      <div className="container relative mx-auto grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="col-span-1 mt-16 w-full rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800">
          <div className="-mt-16 flex justify-center md:justify-start">
            <Image
              className="h-20 w-20 rounded-full border-2 object-cover"
              src={insProfile.picture}
              alt={insProfile.username}
              width={100}
              height={100}
            />
          </div>

          <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">
            {insProfile.nickname}
          </h2>

          <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
            <GrMailOption className="h-6 w-6 fill-current" />
            <h1 className="px-2 text-sm"> {insProfile.email}</h1>
          </div>

          {/* Nếu có thông tin địa chỉ thì hiển thị */}
          {insProfile?.address && (
            <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
              <GrHome className="h-6 w-6 fill-current" />
              <h1 className="px-2 text-sm"> {insProfile.address}</h1>
            </div>
          )}

          {/* Nếu có thông tin số điện thoại thì hiển thị */}
          {insProfile?.phone && (
            <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
              <GrPhone className="h-6 w-6 fill-current" />
              <h1 className="px-2 text-sm"> {insProfile?.phone}</h1>
            </div>
          )}

          <div className="mt-4 flex items-center text-gray-700 dark:text-gray-200">
            <AiFillStar className="h-6 w-6 fill-current text-yellow-300" />
            <h1 className="px-2 text-sm"> {insRating > 0 ? insRating : 'No rating yet'}</h1>
          </div>
        </div>

        <div className="mt-16 w-full grow rounded-lg bg-white px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-2">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">My Bio</h1>
          <div dangerouslySetInnerHTML={{ __html: insProfile?.bio }}></div>
        </div>

        <div className="mt-16 w-full rounded-lg bg-[#F0F0F0] px-8 py-4 shadow-lg ring-1 dark:bg-gray-800 lg:col-span-3">
          <h1 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white">My schedule</h1>
          <EditableSchedule
            instructorId={insProfile._id}
            studentId={user?.sub}
            bookings={bookings}
          />
        </div>
      </div>

      <section className="my-8 dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto mb-12 flex flex-col items-center md:p-10 md:px-12">
          <h1 className="p-4 text-center text-4xl font-semibold leading-none">
            What my students are saying about me
          </h1>
        </div>
        <div className="container mx-auto flex flex-col items-center justify-center lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </section>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { email } = context.query;

  const insProfile = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-user-info?email=${email}`
  );

  // get average rating of instructor
  const insRating = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/ratings/average-rating/${email}`
  );

  // get all approved booking of users
  const bookings = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/bookings/approved/${insProfile.data._id}`
  );

  return {
    props: {
      insProfile: insProfile.data,
      insRating: insRating.data.averageRating ?? 0,
      reviews: insRating.data.reviews,
      bookings: bookings.data,
    },
  };
}

export default withPageAuthRequired(InstructorPage);
