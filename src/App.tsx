import React from 'react';
import './App.css';
import HomePage from './pages/index';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
