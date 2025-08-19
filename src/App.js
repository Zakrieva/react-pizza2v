import React from 'react';
import { Routes, Route } from 'react-router';
import './scss/app.scss';

import Home from './pages/Home';
import NotFoundBlock from './pages/NotFound';
import Cart from './pages/Cart';
import { MainLayout } from './layouts/MainLayout';
import { FullPizza } from './pages/FullPizza';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="not-found" element={<NotFoundBlock />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
}

export default App;
