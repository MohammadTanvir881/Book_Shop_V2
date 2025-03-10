import Navbar from '@/pages/Home/Navbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <h1>this is footer</h1>
    </div>
  );
};

export default AdminLayout;
