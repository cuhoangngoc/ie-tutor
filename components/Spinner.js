const Spinner = () => {
  return (
    <div className="h-screen w-full">
      <div
        className="absolute left-1/2 top-1/2 inline-block h-10 w-10 transform animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-center align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Spinner;
