import React from 'react';
import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import axios from 'axios';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import AddUserForm from '../../components/Admin/AddUserForm';
import DeleteUserForm from '../../components/Admin/DeleteUserForm';

const Users = ({ user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/users`);
      setUsers(res.data);
    };

    getAllUsers();
  });

  function displayUserRole(role) {
    let userRole = '';
    switch (role) {
      case 0:
        userRole = 'Student';
        break;
      case 1:
        userRole = 'Instructor';
        break;
      case 2:
        userRole = 'Admin';
        break;
      default:
        userRole = 'Unknown Role';
    }
    return userRole;
  }

  return (
    <AdminLayout>
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">List users</h2>

          {/* add user btn */}
          <AddUserForm></AddUserForm>
        </div>

        <div className="relative mt-4 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="table-zebra w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Biography
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Operation
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Show all users of the selected department */}
              {users.length > 0 ? (
                users.map((user, i) => (
                  <tr
                    key={user._id}
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
                      {user.username}
                    </td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone || 'Not update'}</td>
                    <td className="px-6 py-4">{user.address || 'Not update'}</td>
                    <td className="px-6 py-4">
                      {<div dangerouslySetInnerHTML={{ __html: user.bio }}></div>}
                    </td>
                    <td className="px-6 py-4">{displayUserRole(user.role)}</td>
                    <td className="px-6 py-4">
                      <DeleteUserForm id={user.id}></DeleteUserForm>
                    </td>
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

export default withPageAuthRequired(Users);
