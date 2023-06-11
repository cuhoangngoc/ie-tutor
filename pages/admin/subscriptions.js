import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { format } from 'date-fns';

const subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);

    function displayformatdate(date) {
        return format(new Date(date), "HH:mm dd-MM-yyyy");
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
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">List subscriptions</h2>

                    {/* add subscriptions btn */}


                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                    <table className="w-full text-sm text-left text-gray-500 table-zebra">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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

export default withPageAuthRequired(subscriptions)