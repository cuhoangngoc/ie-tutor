import React, { useState } from 'react'
import { showSuccessToast, showErrorToast } from '../Toast'
import axios from 'axios';
import { useRouter } from 'next/router';

const DeletePlanForm = ({ id }) => {
    const router = useRouter();

    const deletePlan = async (e) => {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/deleteplan/${id}`);

        if (res.status !== 200) {
            showErrorToast('Delete failed plan');
            return;
        }

        showSuccessToast('Delete plan successfully, page will reload after 5s');
        setTimeout(() => {
            router.reload();
        }, 5000);
    };

    return (
        <>
            <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                className="block text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                type="button"
                onClick={deletePlan}
            >
                Delete
            </button>
        </>


    )
}

export default DeletePlanForm