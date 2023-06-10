import Layout from '../components/Layout/Layout';
import Home_join from '../components/Homepage/Home_join';
import CEO_Allen from '../components/Homepage/CEO_Allen';
import Card from '../components/Homepage/Card';
import Carouse1 from '../components/Homepage/Carouse1';
import Carouse2 from '../components/Homepage/Carouse2';
import axios from 'axios';

Home.title = 'Home';
Home.description = 'Home page';
export default function Home({ instructors }) {
  return (
    <Layout>
        <Home_join/>
        <CEO_Allen/>
        <Card/>
        <Carouse1 instructors={instructors}/>
        {0 &&<Carouse2/>}
    </Layout>
  );
}
export async function getServerSideProps() {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_REST_API_ENDPOINT}/instructors`);
  return {
      props: {
          instructors: res.data,
      },
  };
}
