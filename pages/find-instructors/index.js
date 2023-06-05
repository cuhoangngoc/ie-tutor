import Layout from "../../components/Layout/Layout";
import Card_info from "../../components/Find_instructors/Card_info";
import { AiFillStar } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
export const FindInstructors = () => {
  const [allTutor,setAllTutor]=useState([]);
  const [backupTutor,setBackupTutor]=useState([]);
  const [search,setSearch]=useState("");
  const [startPrice,setStartPrice]=useState("");
  const [endPrice,setEndPrice]=useState("");
  const [rating1,setRating1]=useState(false);
  const [rating2,setRating2]=useState(false);
  const [rating3,setRating3]=useState(false);
  const [rating4,setRating4]=useState(false);
  const [rating5,setRating5]=useState(false);
   useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/users`);
      const data = res.data;
      setAllTutor(data.filter((info)=>info.hourlyWage!=0));
      setBackupTutor(data.filter((info)=>info.hourlyWage!=0));
    };
    fetchData();
  }, []);
  useEffect(()=>{
    setAllTutor(
      backupTutor.filter((data) => {
        return (
          data.username.toLowerCase().includes(search.toLowerCase()) ||
          data.bio.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  },[search])
  const handleClickFilter=()=>{
    setAllTutor(
      backupTutor.filter((data) => {
        if(startPrice=="" || endPrice=="")
        {
          return (
            data
            // (parseInt(data.hourlyWage) >=parseInt(startPrice) && parseInt(data.hourlyWage)<=parseInt(endPrice)) 
            // &&
            // data.bio.toLowerCase().includes(search.toLowerCase())
          );
        }
        else
        { return (
          (parseInt(data.hourlyWage) >=parseInt(startPrice) && parseInt(data.hourlyWage)<=parseInt(endPrice)) 
          // &&
          // data.bio.toLowerCase().includes(search.toLowerCase())
        );}
       
      })
    );
  }
  return (
    <Layout>
      <div className="bg-[#f7f8fc] py-2">
        <div className="mx-5 mt-10 md:mx-10">
          {/* <Search></Search> */}
          {/* search */}
          <div>
            <div className="mt-2 flex flex-col justify-between md:flex-row">
              <h3 className="text-2xl font-bold">46 search results found</h3>
              <div className="flex flex-row items-center justify-between gap-6">
                <select className="border-0 p-2 text-xl">
                  <option>Price hight to low</option>
                  <option>Proce low to hight</option>
                </select>
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
                    onChange={(e)=>setSearch(e.target.value)}
                  ></input>
                </div>
                <div className="flex-rowt flex items-center justify-start gap-4">
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
                </div>
                <a className="ml-1 rounded-xl bg-orange-500 p-2 text-center text-xl font-bold text-white">
                  Search now
                </a>
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
                  {/* <div className="mt-6">
          <details className="" open>
            <summary className="text-xl font-bold">Subject & Level</summary>
            <div className="mt-4">
              <select className="w-full">
                <option>ccxxxxxxxxx</option>
                <option>ccxxxxxxxxx</option>
                <option>ccxxxxxxxxx</option>
              </select>
            </div>
          </details>
        </div> */}
                  <div className="mt-6">
                    <details className="" open>
                      <summary className="text-xl font-bold">
                        Price range
                      </summary>
                      <div className="mt-4 flex flex-row justify-between">
                        <input type="text w-[40%]" defaultValue={0} value={startPrice} onChange={(e)=>setStartPrice(e.target.value)} className="border border-black"/>
                        <input type="text w-[40%]" defaultValue={1000} value={endPrice} onChange={(e)=>setEndPrice(e.target.value)} className="border border-black"/>
                      </div>
                    </details>
                  </div>
                  <div className="mt-6">
                    <details className="" open>
                      <summary className="text-xl font-bold">Gender</summary>
                      <div className="mt-4 flex flex-row justify-between">
                        <select className="w-full">
                          <option>Both</option>
                          <option>Male</option>
                          <option>Female</option>
                        </select>
                      </div>
                    </details>
                  </div>

                  <div className="mt-6">
                    <details className="" open>
                      <summary className="text-xl font-bold">Rating</summary>
                      <div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input type="checkbox" id="rate5" value={5} checked={rating5} onChange={()=>{setRating5(!rating5)}}/>
                          <label
                            htmlFor="rate5"
                            className="flex flex-row gap-1"
                          >
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <span>5.0</span>
                            <span className="text-gray-200">/5.0</span>
                          </label>
                        </div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input type="checkbox" id="rate4" value={4}  checked={rating4} onChange={()=>{setRating4(!rating4)}}/>
                          <label
                            htmlFor="rate4"
                            className="flex flex-row gap-1"
                          >
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <span>4.0</span>
                            <span className="text-gray-200">/5.0</span>
                          </label>
                        </div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input type="checkbox" id="rate3" value={3}  checked={rating3} onChange={()=>{setRating3(!rating3)}}/>
                          <label
                            htmlFor="rate3"
                            className="flex flex-row gap-1"
                          >
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <span>3.0</span>
                            <span className="text-gray-200">/5.0</span>
                          </label>
                        </div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input type="checkbox" id="rate5" value={2}  checked={rating2} onChange={()=>{setRating2(!rating2)}}/>
                          <label
                            htmlFor="rate5"
                            className="flex flex-row gap-1"
                          >
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <span>2.0</span>
                            <span className="text-gray-200">/5.0</span>
                          </label>
                        </div>
                        <div className="mt-4 flex flex-row items-center gap-4">
                          <input type="checkbox" id="rate5" value={5}  checked={rating1} onChange={()=>{setRating1(!rating1)}}/>
                          <label
                            htmlFor="rate5"
                            className="flex flex-row gap-1"
                          >
                            <AiFillStar className="h-6 w-6 text-yellow-300" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <AiFillStar className="h-6 w-6 text-gray-200" />
                            <span>1.0</span>
                            <span className="text-gray-200">/5.0</span>
                          </label>
                        </div>
                      </div>
                    </details>
                  </div>
                  <div className="mt-6">
                    <details className="" open>
                      <summary className="text-xl font-bold">
                        Tutor location
                      </summary>
                    </details>
                  </div>
                  <div className="mt-4 flex flex-col gap-4">
                    <input
                      type="submit"
                      value={"Apply filters"}
                      className="rounded-xl bg-red-500 p-2 text-white cursor-pointer"
                      onClick={handleClickFilter}
                    ></input>
                   
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
            <div className="w-full shadow-lg lg:w-[70%]">
              {allTutor&& allTutor.map((data,key)=>(
                <Card_info data={data} key={key}/>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FindInstructors;
