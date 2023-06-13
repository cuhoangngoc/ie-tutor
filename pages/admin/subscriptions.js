import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { format } from 'date-fns';

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  function displayformatdate(date) {
    return format(new Date(date), 'HH:mm dd-MM-yyyy');
  }

  useEffect(() => {
    const getAllSubscriptions = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/subscriptions`);
      setSubscriptions(res.data);
    };

    getAllSubscriptions();
  });

  return (
    <AdminLayout>
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">List subscriptions</h2>

          {/* add subscriptions btn */}
        </div>

        <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-zebra w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Created at
                </th>
                <th scope="col" className="px-6 py-3">
                  Start date
                </th>
                <th scope="col" className="px-6 py-3">
                  End date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Show all subscriptions of the selected department */}
              {subscriptions.length > 0 ? (
                subscriptions.map((subscription, i) => (
                  <tr
                    key={subscription._id}
                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
                  >
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {i + 1}
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {subscription.email}
                    </td>
                    <td className="px-6 py-4">{subscription.type}</td>
                    <td className="px-6 py-4">{subscription.duration}</td>
                    <td className="px-6 py-4">{subscription.status}</td>
                    <td className="px-6 py-4">{subscription.total} USD</td>
                    <td className="px-6 py-4">{displayformatdate(subscription.createdAt)}</td>
                    <td className="px-6 py-4">{displayformatdate(subscription.startDate)}</td>
                    <td className="px-6 py-4">{displayformatdate(subscription.endDate)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center" colSpan="100%">
                    No users yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </AdminLayout>
  );
};

export default withPageAuthRequired(Subscriptions);
