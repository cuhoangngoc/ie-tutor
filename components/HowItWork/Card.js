const Card = ({
  step: { stepNumber, title, description, color, img, alt },
}) => {
  const colorVariants = {
    orange: 'bg-[#F97316]',
    purple: 'bg-[#6366F1]',
    green: 'bg-[#22C55E]',
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      {/* feature image */}
      <figure className="px-4 py-10">
        <img src={img} alt={alt} className="rounded-xl" decoding="async" />
      </figure>

      {/* Step number */}
      <span
        className={`${colorVariants[color]} mx-auto w-fit rounded-md p-2 text-center font-bold text-white`}
      >
        STEP {stepNumber}
      </span>

      {/* Description */}
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
