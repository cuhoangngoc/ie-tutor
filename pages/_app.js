import { UserProvider } from '@auth0/nextjs-auth0/client';
import Head from 'next/head';
import favicon from '../public/imgs/logo/favicons/favicons-32.png';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('preline');
  }, []);
  return (
    <UserProvider>
      <Head>
        <link rel="icon" type="image/x-icon" href={favicon.src} />
        <title>{Component.title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content={Component.description} />
      </Head>
      <Component {...pageProps} />;
      <ToastContainer />
    </UserProvider>
  );
}

export default MyApp;
