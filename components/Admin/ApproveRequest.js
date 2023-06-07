import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { showSuccessToast, showErrorToast } from '../Toast'
import { useRouter } from 'next/router';

const ApproveRequest = ({ id }) => {
    const router = useRouter();

    const approveRequest = async (e) => {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/role-requests/${id}`);

        if (res.status !== 200) {
            showErrorToast('Approve failly');
            return;
        }

        showSuccessToast('Approach successfully, page will reload after 5s');
        setTimeout(() => {
            router.reload();
        }, 5000);
    };

    return (
        <button
            data-modal-target="authentication-modal"
            data-modal-toggle="authentication-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={approveRequest}
        >
            Approve
        </button>
    )
}

export default ApproveRequest