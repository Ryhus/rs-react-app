import { createBrowserRouter } from 'react-router-dom';

import { Home, PageNotFound, About } from '@/pages';

import MainLayout from '@/Layouts/MainLayout/MainLayout';

import { BreedDetails } from '@/components';

const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,

    children: [
      {
        path: '',
        Component: Home,

        children: [
          {
            path: '',
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
