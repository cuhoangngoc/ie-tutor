import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';

const ReviewCard = ({ review: { comment, picture, studentName, rating } }) => {
  return (
    <div className="mx-4 my-6 flex max-w-sm flex-col shadow-lg">
      <div className="rounded-t-lg px-4 py-12 dark:bg-gray-900 sm:px-8 md:px-12">
        <p className="relative px-6 py-1 text-center text-lg italic dark:text-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="h-8 w-8 dark:text-violet-400"
          >
            <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
            <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
          </svg>
          {comment}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
            className="absolute right-0 h-8 w-8 dark:text-violet-400"
          >
            <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
            <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
          </svg>
        </p>
      </div>
      <div className="my-6 flex flex-col items-center justify-center rounded-b-lg">
        <Image
          src={picture}
          alt=""
          className="-mt-16 mb-2 h-16 w-16 rounded-full bg-cover bg-center"
        />
        <p className="text-xl font-semibold leading-tight">{studentName}</p>
      </div>

      <div className="mb-2 flex items-center justify-center gap-1">
        <h1> {rating > 0 ? rating : 'No rating yet'}</h1>
        <AiFillStar className="h-6 w-6 fill-current text-yellow-300" />
      </div>
    </div>
  );
};

export default ReviewCard;
