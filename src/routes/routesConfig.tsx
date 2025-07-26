import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import PageNotFound from '../pages/PageNotFound.tsx/PageNotFound';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  { path: '*', Component: PageNotFound },
]);

export default router;
