import { createBrowserRouter } from 'react-router-dom';

import { Home, PageNotFound, About } from '@/pages';

import MainLayout from '@/Layouts/MainLayout/MainLayout';

import { BreedDetails } from '@/components';

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
