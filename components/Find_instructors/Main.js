import Sidebar from './Sidebar.js';
import Card_info from './Card_info.js';
const Main = () => {
  return (
    <div className="mt-10 flex flex-row gap-10">
      <div className="hidden w-0 bg-white shadow-lg lg:block lg:w-[30%]">
        <Sidebar />
      </div>
      <div className="w-full shadow-lg lg:w-[70%]">
        <Card_info />
      </div>
    </div>
  );
};

export default Main;
