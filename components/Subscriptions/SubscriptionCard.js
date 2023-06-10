const SubscriptionCard = ({ plan: { bgColor, type, price }, onClick, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="group cursor-pointer rounded-xl"
      style={{ backgroundColor: bgColor }}
    >
      {/* radio input */}
      <div className="mt-4 flex items-center justify-center">
        <input
          type="radio"
          name="subscription"
          id={htmlFor}
          className="h-6 w-6 rounded-full border-2 border-slate-900"
          onClick={onClick}
        />
      </div>

      <div className="flex w-96 translate-x-4 translate-y-4 flex-col rounded-xl bg-white p-8 shadow-xl md:w-auto">
        <div className="mt-3 text-lg font-semibold">{type}</div>
        <div className="mt-4 flex justify-center text-6xl font-extrabold leading-none dark:text-white">
          <span className="ml-1 mr-3 text-xl font-medium leading-8 text-gray-500 dark:text-gray-400">
            from
          </span>
          ${price}
          <span className="ml-1 pt-8 text-2xl font-medium leading-8 text-gray-500 dark:text-gray-400">
            /month
          </span>
        </div>
      </div>
    </label>
  );
};

export default SubscriptionCard;
