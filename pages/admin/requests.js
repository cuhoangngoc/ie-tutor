import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import axios from 'axios';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { format } from 'date-fns';
import ApproveRequest from '../../components/Admin/ApproveRequest';
import RejectRequest from '../../components/Admin/RejectRequest';

const Request = () => {
  const [requests, setRequests] = useState([]);

  function displayformatdate(date) {
    return format(new Date(date), 'HH:mm dd-MM-yyyy');
  }
  function displayapproved(approved) {
    return approved ? 'Yes' : 'No';
  }

  useEffect(() => {
    const getAllRequests = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/role-requests`);
      setRequests(res.data);
    };

    getAllRequests();
  });
  return (
    <AdminLayout>
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">List requests</h2>
        </div>

        <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-zebra w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  User ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Wage hourly
                </th>
                <th scope="col" className="px-6 py-3">
                  Created At
                </th>
                <th scope="col" className="px-6 py-3">
                  Approved
                </th>
                <th scope="col" className="px-6 py-3">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Show all requests of the selected department */}
              {requests.length > 0 ? (
                requests.map((request, i) => (
                  <tr
                    key={request._id}
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
                      {request.userId}
                    </td>
                    <td className="px-6 py-4">{request.hourlyWage}</td>
                    <td className="px-6 py-4">{displayformatdate(request.createdAt)}</td>
                    <td className="px-6 py-4">{displayapproved(request.approved)}</td>
                    <td className="flex space-x-4 px-6 py-4">
                      <ApproveRequest id={request.id}></ApproveRequest>
                      <RejectRequest id={request.id}></RejectRequest>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-center" colSpan="100%">
                    No request yet
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

export default withPageAuthRequired(Request);
