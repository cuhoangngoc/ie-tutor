import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiBell } from 'react-icons/bi';

const NotiBox = ({ user_id }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNoti, setShowNoti] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const id = user_id.split('|')[1].replace(/ /g, '');

      let res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/notifications/${id}`);

      const data = res.data.map((notification) => {
        const date = new Date(notification.createdAt);
        // Get the year, month, and day from the Date object
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // add leading zero to month
        const day = ('0' + date.getDate()).slice(-2); // add leading zero to day

        // Create a formatted date string
        const formattedDate = `${day}/${month}/${year}`;

        return {
          ...notification,
          createdAt: formattedDate,
        };
      });
      setNotifications(data);
    };
    fetchNotifications();
  }, [notifications, user_id]);

  const markAsRead = async (id) => {
    await axios.put(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/notifications/${id}`);
  };

  return (
    <>
      {/* Nếu có thông báo chưa đọc thì hiển thị ping-animated button, còn không thì hiển thị BiBell icon */}
      {notifications.some((notification) => !notification.read) ? (
        <button className="relative inline-block" onClick={() => setShowNoti(!showNoti)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute right-0.5 top-1 block h-1 w-1 animate-ping rounded-full bg-green-600 ring-2 ring-green-400"></span>
        </button>
      ) : (
        <button className="relative inline-block" onClick={() => setShowNoti(!showNoti)}>
          <BiBell className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {showNoti ? (
        <div
          className="absolute right-0 z-10 h-full w-full max-w-sm translate-x-0 transform overflow-x-hidden transition duration-700 ease-in-out"
          id="notification"
        >
          <div className="absolute right-0 h-screen overflow-y-auto border border-sky-900 bg-gray-50 p-8 2xl:w-4/12">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold leading-6 text-gray-800">Notifications</p>
              <button className="cursor-pointer" onClick={() => setShowNoti(!showNoti)}>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="#4B5563"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  className="cursor-pointer"
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="relative mt-8 flex w-full rounded bg-white p-3 ring-1 ring-slate-500">
                    <div className="pl-3">
                      <p className="text-sm leading-none">{notification.message}</p>
                      <p className="pt-1 text-xs leading-3 text-gray-500">
                        {notification.createdAt}
                      </p>
                    </div>

                    {notification.read || (
                      <div className="absolute right-0 top-0 -mr-1 -mt-1 h-4 w-4 animate-ping rounded-full bg-green-300"></div>
                    )}
                  </div>

                  <div className="justiyf-between flex items-center">
                    <hr className="w-full" />
                    <p className="flex flex-shrink-0 px-3 py-16 text-sm leading-normal text-gray-500">
                      Thats it for now :)
                    </p>
                    <hr className="w-full" />
                  </div>
                </div>
              ))
            ) : (
              <div>
                <p className="mt-4 text-sm leading-none text-gray-500">No notifications</p>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default NotiBox;
