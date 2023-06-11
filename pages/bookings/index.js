import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { getSession } from '@auth0/nextjs-auth0';
import { showSuccessToast, showErrorToast } from '../../components/Toast';
import { useRouter } from 'next/router';
import ViewBookingModal from '../../components/Bookings/ViewBookingModal';

const color = {
  pending: '#F7D060',
  approved: '#98D8AA',
  rejected: '#FF6969',
};

const Bookings = ({ user, userProfile, bookings }) => {
  const router = useRouter();

  const handleApproveClick = async (bookingId) => {
    // update booking status to approved
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/bookings/${bookingId}`
      );
      if (res.status !== 200) throw new Error(res.data.message);
      showSuccessToast(`Booking ${bookingId} has been approved!`);
      setTimeout(() => {
        router.reload();
      }, 5000);
    } catch (err) {
      showErrorToast(err.message);
      console.log(err);
    }
  };

  const handleCancelClick = async (bookingId) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/bookings/${bookingId}`
      );
      if (res.status !== 200) throw new Error(res.data.message);
      showSuccessToast(`Booking ${bookingId} has been canceled!`);
      setTimeout(() => {
        router.reload();
      }, 5000);
    } catch (err) {
      showErrorToast(err.message);
      console.log(err);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto my-10">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
          {userProfile.username}&#39;s bookings
        </h1>
        <div className="mt-5 flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden rounded-lg border shadow dark:border-gray-700 dark:shadow-gray-900">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        {userProfile.role ? 'Instructor' : 'Student'}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        Start date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        End date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {bookings.map((booking, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                          {userProfile.role ? booking.instructorId : booking.studentId}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                          {booking.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                          {Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                          }).format(new Date(booking.startDate))}
                        </td>{' '}
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                          {Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                          }).format(new Date(booking.endDate))}
                        </td>
                        <td
                          className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-800 dark:text-gray-200"
                          style={{ color: color[booking.status] }}
                        >
                          {booking.status}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <div className="flex gap-2 ">
                            <ViewBookingModal booking={booking} />

                            {booking.status === 'pending' && userProfile.role && (
                              <button
                                className="rounded-md bg-success p-2"
                                onClick={() => {
                                  handleApproveClick(booking.id);
                                }}
                              >
                                Approve
                              </button>
                            )}
                            <button
                              className="rounded-md bg-error p-2"
                              onClick={() => {
                                handleCancelClick(booking.id);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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

  const userProfile = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-user-info?email=${user.email}`
  );

  if (userProfile.data.role === 0) {
    // get all bookings of this student
    const bookings = await axios.get(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/bookings/student/${userProfile.data._id}`
    );

    return {
      props: {
        userProfile: userProfile.data,
        bookings: bookings.data,
      },
    };
  }

  // get all bookings of this instructor
  const bookings = await axios.get(
    `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/bookings/instructor/${userProfile.data._id}`
  );

  const priorityOrder = {
    pending: 0,
    approved: 1,
    canceled: 2,
  };

  // sort bookings by status
  const sortedBooking = bookings.data.sort(
    (a, b) => priorityOrder[a.status] - priorityOrder[b.status]
  );

  return {
    props: {
      userProfile: userProfile.data,
      bookings: sortedBooking,
    },
  };
}

export default withPageAuthRequired(Bookings);
