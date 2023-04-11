import '../styles/globals.css';
import Head from 'next/head';
import favicon from '../public/imgs/logo/favicons/favicons-32.png';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href={favicon.src} />
        <title>{Component.title}</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
