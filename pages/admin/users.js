import React from 'react'
import { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import axios from 'axios';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import AddUserForm from '../../components/Admin/AddUserForm';
import DeleteUserForm from '../../components/Admin/DeleteUserForm';

const users = ({ user }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/users`);
            setUsers(res.data);
        };

        getAllUsers();
    }, [user.email]);

    function displayUserRole(role) {
        let userRole = "";
        switch (role) {
            case 0:
                userRole = "Student";
                break;
            case 1:
                userRole = "Instructor";
                break;
            case 2:
                userRole = "Admin";
                break;
            default:
                userRole = "Unknown Role";
        }
        return userRole;
    }

    return (
        <AdminLayout>
            <section className="mt-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">List users</h2>

                    {/* add user btn */}
                    <AddUserForm></AddUserForm>

                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                    <table className="w-full text-sm text-left text-gray-500 table-zebra">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                                    >
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {i + 1}
                                        </td>
                                        <td
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">
                                            {user.phone || 'Not update'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.address || 'Not update'}
                                        </td>
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
                                    <td className="text-center py-4 px-6" colSpan="100%">
                                        No users yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </AdminLayout>
    )
}

export default withPageAuthRequired(users)