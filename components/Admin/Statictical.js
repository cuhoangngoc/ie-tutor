import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Statictical = () => {
    const [countUsers, setCountUsers] = useState([]);
    const [revenueMonth, setRevenueMonth] = useState([]);

    useEffect(() => {
        const getcountUsers = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/users/stats`);
            setCountUsers(res.data);
        };
        const getrevenuemonth = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/revenue-month`);
            setRevenueMonth(res.data);
        };

        getcountUsers();
        getrevenuemonth();
    });

    return (
        <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
                    <div class="p-4 md:p-5">
                        <div class="flex items-center gap-x-2">
                            <p class="text-xs uppercase tracking-wide text-gray-500">
                                Total users
                            </p>
                        </div>

                        <div class="mt-1 flex items-center">
                            <h3 class="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                                {countUsers.totalUsers}
                            </h3>
                            
                        </div>
                    </div>
                </div>

                <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
                    <div class="p-4 md:p-5">
                        <div class="flex items-center gap-x-2">
                            <p class="text-xs uppercase tracking-wide text-gray-500">
                                Total Student
                            </p>
                        </div>

                        <div class="mt-1 flex items-center">
                            <h3 class="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                                {countUsers.usersWithRole0}
                            </h3>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
                    <div class="p-4 md:p-5">
                        <div class="flex items-center gap-x-2">
                            <p class="text-xs uppercase tracking-wide text-gray-500">
                                TOTAL TUTOR
                            </p>
                        </div>

                        <div class="mt-1 flex items-center">
                            <h3 class="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                                {countUsers.usersWithRole1}
                            </h3>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-slate-900 dark:border-gray-800">
                    <div class="p-4 md:p-5">
                        <div class="flex items-center gap-x-2">
                            <p class="text-xs uppercase tracking-wide text-gray-500">
                                total revenue for the month
                            </p>
                        </div>

                        <div class="mt-1 flex items-center">
                            <h3 class="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
                                {revenueMonth} USD
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statictical