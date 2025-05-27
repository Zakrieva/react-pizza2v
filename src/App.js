import React from 'react';
import { Routes, Route } from 'react-router';
import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import NotFoundBlock from './pages/NotFound';
import Cart from './pages/Cart';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/not-found" element={<NotFoundBlock />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
