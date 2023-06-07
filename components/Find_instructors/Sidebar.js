import { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import {
  BsFillSunriseFill,
  BsFillSunFill,
  BsFillSunsetFill,
} from 'react-icons/bs';
export const Sidebar = () => {
  const [state, setState] = useState(true);
  return (
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
            <summary className="text-xl font-bold">Price range</summary>
            <div className="mt-4 flex flex-row justify-between">
              <input type="text w-[40%]" defaultValue={1} />
              <input type="text w-[40%]" defaultValue={45000} />
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
                <input type="checkbox" id="rate5" value={5} />
                <label htmlFor="rate5" className="flex flex-row gap-1">
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
                <input type="checkbox" id="rate4" value={4} />
                <label htmlFor="rate4" className="flex flex-row gap-1">
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
                <input type="checkbox" id="rate3" value={3} />
                <label htmlFor="rate3" className="flex flex-row gap-1">
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
                <input type="checkbox" id="rate5" value={5} />
                <label htmlFor="rate5" className="flex flex-row gap-1">
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
                <input type="checkbox" id="rate5" value={5} />
                <label htmlFor="rate5" className="flex flex-row gap-1">
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
            <summary className="text-xl font-bold">Tutor location</summary>
            
          </details>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <input
            type="submit"
            defaultValue={'Apply filters'}
            className="rounded-xl bg-red-500 p-2 text-white"
          ></input>
          <input
            type="submit"
            defaultValue={'Clear all filters'}
            className="rounded-xl bg-gray-300 p-2"
          ></input>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
