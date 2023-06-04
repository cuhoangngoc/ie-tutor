import { BsCheck2Circle } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlinePlace } from 'react-icons/md';
import { SlCamrecorder } from 'react-icons/sl';

export const Card_info = () => {
  const dataTest = [
    {
      img: 'nothing',
      imgProfile: 'nothing',
      name: 'Vu Tung Lam',
      country: 'HCM',
      price: 69.0,
      description:
        'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble',
    },
    {
      img: 'nothing',
      imgProfile: 'nothing',
      name: 'Vu Tung Lam',
      country: 'HCM',
      price: 69.0,
      description:
        'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble',
    },
    {
      img: 'nothing',
      imgProfile: 'nothing',
      name: 'Vu Tung Lam',
      country: 'HCM',
      price: 69.0,
      description:
        'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble',
    },
    {
      img: 'nothing',
      imgProfile: 'nothing',
      name: 'Vu Tung Lam',
      country: 'HCM',
      price: 69.0,
      description:
        'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble',
    },
    {
      img: 'nothing',
      imgProfile: 'nothing',
      name: 'Vu Tung Lam',
      country: 'HCM',
      price: 69.0,
      description:
        'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble',
    },
  ];
  return (
    <div className="">
      {dataTest.map((data, i) => (
        <div
          className="mt-4 flex flex-col gap-4 rounded-md bg-white p-4 shadow-lg md:flex-row "
          key={i}
        >
          <div className="h-[320px] w-full bg-black md:w-[50%]"></div>
          <div className="col-span-2 w-full">
            <div className=" flex flex-col justify-between md:flex-row">
              <div className="flex flex-row">
                <div className="mr-2">
                  {/* <Image     
                  src={"https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/03/placeholder-100x100.png"} 
                    className="h-14 w-14 rounded-full"
                    alt='abc'
                    width={14}
                    height={14}
                  /> */}
                  <img
                    src="https://demos.wp-guppy.com/tuturn/wp-content/uploads/2022/03/placeholder-100x100.png"
                    className="h-14 w-14 rounded-full"
                  />
                </div>
                <div>
                  <div className="flex flex-row items-center gap-4">
                    <h3>Arianne Kearns</h3>
                    <span>
                      <BsCheck2Circle className="h-5 w-5 text-green-600" />
                    </span>
                  </div>
                  <div className="flex flex-row gap-4">
                    <p className="flex flex-row items-center gap-1">
                      5.0{' '}
                      <span>
                        {' '}
                        <AiFillStar className="text-yellow-300" />
                      </span>
                      (06){' '}
                    </p>
                    <p className="flex flex-row items-center gap-2">
                      {' '}
                      <span>
                        {' '}
                        <MdOutlinePlace />
                      </span>
                      Charlotte, Ok
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between md:block md:text-end">
                <p>Starting from:</p>
                <h3 className="text-xl font-bold text-cyan-400">$69.00/hr</h3>
              </div>
            </div>
            <div className="mt-2  flex flex-col gap-2 md:flex-row ">
              <p className="self-start font-bold md:self-center">
                Availability
              </p>
              <ul className="flex flex-row flex-wrap gap-2">
                <li className=" self-center rounded-lg bg-green-200 p-1 md:p-2">
                  <span>Mon</span>
                </li>
                <li className="self-center rounded-lg bg-green-200 p-1 md:p-2">
                  <span>TUE</span>
                </li>
                <li className="self-center rounded-lg bg-green-200 p-1 md:p-2 ">
                  <span>WED</span>
                </li>
                <li className="self-center rounded-lg bg-green-200 p-1 md:p-2">
                  <span>THU</span>
                </li>
                <li className="self-center rounded-lg bg-gray-200 p-1 md:p-2">
                  <span>FRI</span>
                </li>
                <li className="self-center rounded-lg bg-gray-200 p-1 md:p-2">
                  <span>SAT</span>
                </li>
                <li className="self-center rounded-lg bg-gray-200 p-1 md:p-2">
                  <span>SUN</span>
                </li>
              </ul>
            </div>
            <div className="mt-2 ">
              <p className="font-bold">
                You can get teaching service direct at
              </p>
              <ul className="mt flex flex-row flex-wrap gap-2">
                <li className=" flex flex-row items-center gap-2 rounded-lg bg-gray-200 px-4 py-2">
                  <SlCamrecorder className="text-red-400" /> <span>Online</span>
                </li>
                <li className=" flex flex-row items-center gap-2 rounded-lg bg-gray-200 px-4 py-2">
                  <SlCamrecorder className="text-red-400" />{' '}
                  <span>Offline</span>
                </li>
                <li className=" flex flex-row items-center gap-2 rounded-lg bg-gray-200 px-4 py-2">
                  <SlCamrecorder className="text-red-400" />{' '}
                  <span>Student place</span>
                </li>
                <li className=" flex flex-row items-center gap-2 rounded-lg bg-gray-200 px-4 py-2">
                  <SlCamrecorder className="text-red-400" />{' '}
                  <span>Tutor place</span>
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <p>
                On the other hand, we denounce with righteous indignation and
                dislike men who are so beguiled and demoralized by the charms of
                pleasure of the moment, so blinded by desire, that they cannot
                foresee the pain and trouble
              </p>
            </div>
            <div>
              <ul className="mt-4 flex flex-row gap-2">
                <li className=" flex flex-row items-center gap-2  rounded-lg bg-gray-200 px-2">
                  {' '}
                  <span>Arts, craft & music</span>
                </li>
                <li className=" flex flex-row items-center gap-2  rounded-lg bg-gray-200 px-2">
                  {' '}
                  <span>Gruaduation</span>
                </li>
                <li className=" flex flex-row items-center gap-2  rounded-lg bg-gray-200 px-2">
                  {' '}
                  <span>Health, fitness, sports</span>
                </li>
                <li className=" flex flex-row items-center gap-2  rounded-lg bg-gray-200 px-2">
                  {' '}
                  <span>IT</span>
                </li>
                <li className=" flex flex-row items-center gap-2  rounded-lg bg-gray-200 px-2">
                  {' '}
                  <span>...</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card_info;
