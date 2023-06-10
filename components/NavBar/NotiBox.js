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

  const unreadNoti = notifications.filter((notification) => !notification.read);

  return (
    <>
      {/* Nếu có thông báo chưa đọc thì hiển thị ping-animated button, còn không thì hiển thị BiBell icon */}
      {unreadNoti ? (
        <button className="relative inline-block" onClick={() => setShowNoti(!showNoti)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
          {unreadNoti.length > 0 && (
            <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center rounded-full bg-rose-500 px-1.5 py-0.5 text-xs font-medium text-white">
              {unreadNoti.length}
            </span>
          )}
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
              <>
                {notifications.map((notification) => (
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
                  </div>
                ))}
                <div className="justiyf-between flex items-center">
                  <hr className="w-full" />
                  <p className="flex flex-shrink-0 px-3 py-16 text-sm leading-normal text-gray-500">
                    Thats it for now :)
                  </p>
                  <hr className="w-full" />
                </div>
              </>
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
