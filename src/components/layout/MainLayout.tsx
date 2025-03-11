import Footer from '@/pages/Home/Footer';
import Navbar from '../../pages/Home/Navbar';

import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
