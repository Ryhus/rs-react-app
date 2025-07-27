import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout/MainLayout';
import Home from '../pages/Home/Home';
import PageNotFound from '../pages/PageNotFound.tsx/PageNotFound';
import About from '../pages/About/About';
import BreedDetails from '../components/BreedDetails/BreedDetails';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: false,
        path: '',
        Component: Home,
        children: [
          {
            path: 'details/:breedId',
            Component: BreedDetails,
          },
        ],
      },
      {
        path: 'about',
        Component: About,
      },
    ],
  },

  { path: '*', Component: PageNotFound },
]);

export default router;
