import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../Layouts/MainLayout/MainLayout';
import Home from '../pages/Home/Home';
import PageNotFound from '../pages/PageNotFound.tsx/PageNotFound';
import About from '../pages/About/About';
import BreedDetails from '../components/BreedDetails/BreedDetails';

import {
  allBreedsLoader,
  breedDetailsLoader,
  revalidateHomeRoute,
} from './DataHandlers/Home/HomeLoaders';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,

    children: [
      {
        path: '',
        Component: Home,
        loader: allBreedsLoader,
        shouldRevalidate: revalidateHomeRoute,
        children: [
          {
            path: '',
            Component: BreedDetails,
            loader: breedDetailsLoader,
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
