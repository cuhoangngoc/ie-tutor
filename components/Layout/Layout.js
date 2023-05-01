import NavBar from '../NavBar/NavBar';
import AppFooter from '../Footer/Footer';
import Head from 'next/head';
import favicon from '../../public/imgs/logo/favicons/favicons-32.png';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <AppFooter />
    </>
  );
};

export default Layout;
