import { BsCheck2Circle } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { MdOutlinePlace } from "react-icons/md";
import { SlCamrecorder } from "react-icons/sl";
import Image from "next/image";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

const Card_info = ({ data }) => {
  console.log(data)
  return (
    <div>
      <div
        className="mt-4 flex flex-col gap-4 rounded-md bg-white p-4 shadow-lg md:flex-row "
      >
        <div className="max-h-[200px] w-full md:w-[50%]">
          <Image
            src={data.picture}
            className="h-full w-full rounded-md object-cover"
            width={200}
            height={200}
            alt=""
          />
        </div>

        <div className="col-span-2 w-full flex-col justify-between">
          <div className=" flex flex-col justify-between md:flex-row">
            <div className="flex flex-row">
              <div className="mr-2">
                <Image
                  src={data.picture}
                  className="h-14 w-14 rounded-full"
                  width={50}
                  height={50}
                  alt=""
                />
              </div>
              <div>
                <div className="flex flex-row items-center gap-4">
                  <h3>{data.username}</h3>
                  <span>
                    <BsCheck2Circle className="h-5 w-5 text-green-600" />
                  </span>
                </div>
                <div className="flex flex-row gap-4">
                  <p className="flex flex-row items-center gap-1">
                    {/* {data.instructorRating} */}
                    <span>
                      {" "}
                      <AiFillStar className="text-yellow-300" />
                    </span>
                    {/* {data.totalReviews}{" "} */}
                  </p>
                  <p className="flex flex-row items-center gap-2">
                    {" "}
                    <span>
                      {" "}
                      <MdOutlinePlace />
                    </span>
                    {data.address}, Ok
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between md:block md:text-end">
              <p>Starting from:</p>
              <h3 className="text-xl font-bold text-cyan-400">
                ${data.hourlyWage}/hr
              </h3>
            </div>
          </div>
         
          <div className="mt-4 max-h-20 overflow-y-auto">
            <p dangerouslySetInnerHTML={{ __html: data.bio }}></p>
          </div>

          <div className="mt-auto">
            <Link href="#" className="hover:opacity-80">
              <span
                className={`rounded-md p-2 text-white`}
                style={{ backgroundColor: data.color }}
              >
                {data.subjectName}
              </span>
            </Link>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default Card_info;
