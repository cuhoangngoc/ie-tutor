import NavBar from '../NavBar/Navbar';
import AppFooter from '../Footer/Footer';

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
