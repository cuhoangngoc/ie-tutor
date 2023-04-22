import Layout from '../components/Layout/Layout';
import Search from '../components/Find_instructors/Search.js';
import Main from '../components/Find_instructors/Main.js'
export const Find_instructors = () => {
  return (
    <Layout>
      <div className="bg-[#f7f8fc] py-2">
        <div className="mx-5 mt-10 md:mx-10">
          <Search></Search>
          <Main></Main>
        </div>
      </div>
    </Layout>
  );
};

export default Find_instructors;
