import React from 'react';
import { Routes, Route } from 'react-router';
import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import NotFoundBlock from './pages/NotFound';
import Cart from './pages/Cart';

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div class="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div class="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/not-found" element={<NotFoundBlock />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
