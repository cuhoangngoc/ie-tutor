import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import styles from '../styles/Home.module.css';
import Home_join from '../components/Homepage/Home_join';
import CEO_Allen from '../components/Homepage/CEO_Allen';
import Card from '../components/Homepage/Card';
import Carouse1 from '../components/Homepage/Carouse1';
import Carouse2 from '../components/Homepage/Carouse2';

Home.title = 'Home';

export default function Home() {
  return (
    <Layout>
        <Home_join/>
        <CEO_Allen/>
        <Card/>
        <Carouse1></Carouse1>
        <Carouse2/>
    </Layout>
  );
}
