import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import Home from './pages/Home';
import Objective from './pages/Objective';
import Campaign from './pages/Campaign';

// 創建路由器配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/objective',
        element: <Objective />,
      },
      {
        path: '/campaign',
        element: <Campaign />,
      },
    ],
  },

  { path: '*', element: <Navigate to="/" replace /> },
]);

function RouteComponent() {
  return <RouterProvider router={router} />;
}

export default RouteComponent;
