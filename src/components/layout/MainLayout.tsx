import Benner from '@/pages/Home/Benner';
import Navbar from '../../pages/Home/Navbar';
import PCarousel from '@/pages/Home/PCarousel';

const MainLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <PCarousel></PCarousel>
      <Benner></Benner>
    </>
  );
};

export default MainLayout;
