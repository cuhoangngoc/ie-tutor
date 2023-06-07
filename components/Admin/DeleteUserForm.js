import React, { useState } from 'react'
import { showSuccessToast, showErrorToast } from '../Toast'
import axios from 'axios';
import { useRouter } from 'next/router';

const DeleteUserForm = ({ id }) => {
  const router = useRouter();

  const deleteUser = async (e) => {
    const res = await axios.delete(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/deleteuser/${id}`);

    if (res.status !== 200) {
      showErrorToast('Delete failed user');
      return;
    }

    showSuccessToast('Delete user successfully, page will reload after 5s');
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
        onClick={deleteUser}
      >
        Delete
      </button>
    </>
  )
}

export default DeleteUserForm