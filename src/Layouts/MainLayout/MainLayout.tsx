import { Outlet } from 'react-router-dom';
import { Header } from '@/components';

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default MainLayout;
