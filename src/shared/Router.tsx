import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../page/Layout';
import Mainpage from '../page/Mainpage';
import Loginpage from '../page/Loginpage';
import ProductDetailpage from '../page/ProductDetailpage';
import GoodsList from '../page/GoodsList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="*" element={<ProductDetailpage />} />
          <Route path="/GoodsList" element={<GoodsList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
