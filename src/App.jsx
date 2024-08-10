
import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import HomePage from './Pages/HomePage';
import BasicLayout from './Layout/BasicLayout';
import Projects from './Pages/Project';
import NotFoundPage from './Pages/NotFoundPage';
import Category from './Pages/Category';
// If Projects is not used, you can remove this import
// import Projects from './Project';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BasicLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path="/project/:UrlName" element={<Projects/>} />
      <Route path="/category" element={<Category/>} />
      <Route path="*" element={<NotFoundPage/>} />
    </Route>
)
);

const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;
