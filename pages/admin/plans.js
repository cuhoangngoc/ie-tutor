import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/AdminLayout/AdminLayout'
import AddPlanForm from '../../components/Admin/AddPlanForm';
import EditPlanForm from '../../components/Admin/EditPlanForm';
import DeletePlanForm from '../../components/Admin/DeletePlanForm';
import axios from 'axios';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

const plans = () => {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/plans`);
            setPlans(res.data);
        };

        getAllUsers();
    });
    
    return (
        <AdminLayout>
            <section className="mt-10">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">List plans</h2>

                    {/* add plan btn */}
                    <AddPlanForm></AddPlanForm>

                </div>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                    <table className="w-full text-sm text-left text-gray-500 table-zebra">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    #
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Duration
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Background color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Operation
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Show all plans of the selected department */}
                            {plans.length > 0 ? (
                                plans.map((plan, i) => (
                                    <tr
                                        key={plan._id}
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
                                            {plan.type}
                                        </td>
                                        <td className="px-6 py-4">{plan.price}</td>
                                        <td className="px-6 py-4">{plan.duration}</td>
                                        <td className="px-6 py-4">{plan.bgColor}</td>
                                        <td className="px-6 py-4 flex space-x-4">
                                            <EditPlanForm id={plan.id}></EditPlanForm>
                                            <DeletePlanForm id={plan.id}></DeletePlanForm>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="text-center py-4 px-6" colSpan="100%">
                                        No plans yet
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

export default withPageAuthRequired(plans)