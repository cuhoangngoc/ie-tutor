import { useEffect, useState } from 'react';
import Button from '../Button';
import Link from 'next/link';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '../Toast';
import { config } from 'daisyui';

export default function Modal({ user_id }) {
  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/subjects`);

      // Sắp xếp lại mảng subjects theo thứ tự tăng dần của tên môn học
      res.data.sort((a, b) => (a.name > b.name ? 1 : -1));

      setSubjects(res.data);
    };
    fetchSubjects();
  }, [subjects]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = document.getElementById('subject').options;
    for (const option of options) {
      if (option.selected) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/instructor-subject-requests`,
            {
              instructorId: user_id,
              subjectId: option.value,
              message,
            }
          );
        } catch (err) {
          showErrorToast('Some error occurred');
        }
      }
    }

    showSuccessToast('Your request has been sent');
    setShowModal(false);
  };

  return (
    <>
      {/* Modal đăng ký dạy học */}
      <Button className="bg-primary" onClick={() => setShowModal(true)}>
        Register for teaching
      </Button>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none transition-all duration-200 focus:outline-none">
            <div className="relative mx-auto my-6 w-auto max-w-3xl">
              {/*content*/}
              <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
                  <h3 className="text-3xl font-semibold">Teaching registration</h3>
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
                  {/* subject request form */}
                  <form>
                    <div className="mb-4">
                      <label className="mb-2 block text-sm font-bold text-gray-700">
                        Select subject
                      </label>

                      <select
                        className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                        id="subject"
                        multiple
                      >
                        {subjects.map((subject) => (
                          // disable option nếu user_id đã có trong subject.instructor_ids
                          <option
                            key={subject._id}
                            value={subject._id}
                            disabled={subject.instructorIds.includes(user_id)}
                          >
                            {subject.name}
                          </option>

                        ))}
                      </select>

                      {/* Message */}
                      <label className="mb-2 mt-4 block text-sm font-bold text-gray-700">
                        Message
                      </label>
                      <textarea
                        className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
                        id="message"
                        rows="3"
                        placeholder="Enter your message here"
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>

                      <p className="text-xs italic text-gray-600">
                        You can select multiple subjects
                      </p>
                    </div>
                  </form>
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
