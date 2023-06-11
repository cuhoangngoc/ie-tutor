import Layout from '../../components/Layout/Layout';
import Card_info from '../../components/Find_instructors/Card_info';
import { AiFillStar } from 'react-icons/ai';
import { useState, useEffect, use } from 'react';
import axios from 'axios';
export const FindInstructors = ({ instructors }) => {
  const [allTutor, setAllTutor] = useState([]);
  const [search, setSearch] = useState('');
  const [selectRatingChange, setSlectRatingChange] = useState('0');
  const [selectOption, setSelectOption] = useState('');
  useEffect(() => {
    setAllTutor(instructors);
  }, [instructors]);
  useEffect(() => {
    setAllTutor(
      instructors.filter((data) => {
        return (
          data.username.toLowerCase().includes(search.toLowerCase()) ||
          data.bio.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  }, [search, instructors]);

  useEffect(() => {
    console.log(selectRatingChange);
    setAllTutor(instructors.filter((data) => data.rating >= selectRatingChange));
  }, [selectRatingChange, instructors]);

  // useEffect(() => {
  //   const backupinstructors = instructors;
  //   if (selectOption === 'Price hight to low') {
  //     setAllTutor(
  //       backupinstructors.sort(function (a, b) {
  //         return b.hourlyWage - a.hourlyWage;
  //       })
  //     );
  //   } else if (selectOption === 'Price low to hight') {
  //     setAllTutor(
  //       backupinstructors.sort(function (a, b) {
  //         return a.hourlyWage - b.hourlyWage;
  //       })
  //     );
  //   }
  // }, [selectOption, instructors]);

  const resetFilter = () => {
    setAllTutor(instructors);
    setSelectOption('');
    setSlectRatingChange('0');
    setSearch('');
  };
  return (
    <Layout>
      <div className="bg-[#f7f8fc] py-2">
        <div className="mx-5 mt-10 md:mx-10">
          <div>
            <div className="mt-2 flex flex-col justify-between md:flex-row">
              <h3 className="text-2xl font-bold">{allTutor.length} search results found</h3>
              <div className="flex flex-row items-center justify-between gap-6">
                {/* <select
                  className="border-0 p-2 text-xl"
                  value={selectOption}
                  onChange={(e) => {
                    setSelectOption(e.target.value);
                  }}
                >
                  <option value={'Price hight to low'}>Price hight to low</option>
                  <option value={'Price low to hight'}>Price low to hight</option>
                </select> */}
                <div className="flex flex-row gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-full w-6 cursor-pointer hover:bg-white "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-full w-6 cursor-pointer hover:bg-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col md:flex-row">
              <div className=" flex w-full flex-col gap-4 rounded-l bg-white p-4 md:w-[80%] md:flex-row ">
                <div className="flex  w-full items-center gap-4 md:w-[60%]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <input
                    className="w-full border-none"
                    type="text"
                    placeholder="What are you looking for?"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  ></input>
                </div>
                {/* <div className="flex-rowt flex items-center justify-start gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                    />
                  </svg>
                  <select className="w-full border-0 ">
                    <option>Select category</option>
                  </select>
                </div> */}
                {/* <a className="ml-1 rounded-xl bg-orange-500 p-2 text-center text-xl font-bold text-white">
                  Search now
                </a> */}
              </div>
              <div className="ml-2 hidden w-[20%] flex-row items-center gap-4 md:flex">
                <img
                  src="https://demos.wp-guppy.com/tuturn/wp-content/plugins/tuturn/public/images/shape.png"
                  className="h-4 w-[15%]"
                />
                <span className="font-semibold">Start from here</span>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="mt-10 flex flex-row gap-10">
            <div className="hidden w-0 bg-white shadow-lg lg:block lg:w-[30%]">
              {/* <Sidebar /> */}
              <div className="p-5">
                <div className="">
                  <div className="mt-6">
                    <details className="" open>
                      <summary className="text-xl font-bold">Rating</summary>
                      <div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input
                            type="radio"
                            id="rate5"
                            name="rating"
                            value={5}
                            onChange={(e) => {
                              setSlectRatingChange(e.target.value);
                            }}
                          />
                          <label htmlFor="rate5" className="flex cursor-pointer flex-row gap-1">
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <span>5.0/5.0</span>
                          </label>
                        </div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input
                            type="radio"
                            id="rate4"
                            name="rating"
                            value={4}
                            onChange={(e) => {
                              setSlectRatingChange(e.target.value);
                            }}
                          />
                          <label htmlFor="rate4" className="flex cursor-pointer flex-row gap-1">
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <span>And higher</span>
                          </label>
                        </div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input
                            type="radio"
                            id="rate3"
                            name="rating"
                            value={3}
                            onChange={(e) => {
                              setSlectRatingChange(e.target.value);
                            }}
                          />
                          <label htmlFor="rate3" className="flex cursor-pointer flex-row gap-1">
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <span>And higher</span>
                          </label>
                        </div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input
                            type="radio"
                            id="rate2"
                            name="rating"
                            value={2}
                            onChange={(e) => {
                              setSlectRatingChange(e.target.value);
                            }}
                          />
                          <label htmlFor="rate2" className="flex cursor-pointer flex-row gap-1">
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <span>And higher</span>
                          </label>
                        </div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input
                            type="radio"
                            id="rate1"
                            name="rating"
                            value={1}
                            onChange={(e) => {
                              setSlectRatingChange(e.target.value);
                            }}
                          />
                          <label htmlFor="rate1" className="flex cursor-pointer flex-row gap-1">
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <span>And higher</span>
                          </label>
                        </div>
                      </div>
                    </details>
                  </div>

                  <div className="mt-4 text-center">
                    <button className="btn-error btn" onClick={resetFilter}>
                      Reset filter
                    </button>
                  </div>
                  {/* <div className="mt-4 flex flex-col gap-4">
                    <input
                      type="submit"
                      value={"Apply filters"}
                      className="cursor-pointer rounded-xl bg-red-500 p-2 text-white"
                      onClick={handleClickFilter}
                    ></input>
                  </div> */}
                </div>
              </div>
              {/*  */}
            </div>
            <div className="w-full shadow-lg transition-all duration-200 lg:w-[70%]">
              {allTutor && allTutor.map((data, key) => <Card_info data={data} key={key} />)}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const instructors = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/instructors`);
  return {
    props: {
      instructors: instructors.data,
    },
  };
}

export default FindInstructors;
