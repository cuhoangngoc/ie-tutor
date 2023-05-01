import { useState } from 'react';
import Button from '../Button';
import Link from 'next/link';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '../Toast';

export default function Modal({ user_id }) {
  const [showModal, setShowModal] = useState(false);
  const [privacyAgreement, setPrivacyAgreement] = useState(false);
  const [hourlyWage, setHourlyWage] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if user has agreed to privacy policy
    const privacyAgreement = document.getElementById('acceptPrivacy').checked;
    if (!privacyAgreement) {
      showErrorToast('You must agree to our privacy policy');
      return;
    } else if (hourlyWage <= 0) {
      showErrorToast('Hourly wage must be greater than 0');
      return;
    }

    // send request to REST API
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/users/add-instructor-request`,
      {
        userId: user_id,
        hourlyWage: hourlyWage,
      }
    );
    console.log(res);

    if (res.status === 200) showSuccessToast('Your request has been sent');

    setShowModal(false);
  };

  return (
    <>
      <Button className="bg-primary" onClick={() => setShowModal(true)}>
        Become instructor
      </Button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none transition-all duration-200 focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold">Become an instructor in our platform</h3>
                  <button
                    className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative flex-auto p-6">
                  {/* accept privacy checkbox */}
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-lg leading-relaxed text-gray-600">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente soluta omnis
                      adipisci cumque commodi? Ab dolor vel ullam. Sunt expedita voluptas rerum
                      consequatur ad. Voluptate distinctio explicabo iste tempore enim.
                    </p>

                    {/* input lương theo giờ mong muốn */}
                    <div className="mt-4">
                      <label
                        htmlFor="hourlyWage"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expected hourly wage
                      </label>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="hourlyWage"
                          id="hourlyWage"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                          placeholder="Hourly wage"
                          onChange={(e) => setHourlyWage(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex items-center">
                      <input
                        id="acceptPrivacy"
                        name="acceptPrivacy"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        onChange={() => setPrivacyAgreement(!privacyAgreement)}
                      />
                      <label
                        htmlFor="acceptPrivacy"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        I agree to the{' '}
                        <Link href="#" className="text-emerald-600 hover:text-emerald-500">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
                  <button
                    className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Send request
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      ) : null}
    </>
  );
}
