import Dashboard from '@/routs/Dashboard';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div>
      <Dashboard></Dashboard>
      <Outlet></Outlet>
    </div>
  );
};

export default UserLayout;
