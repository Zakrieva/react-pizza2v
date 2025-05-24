import React from 'react';
import { Routes, Route } from 'react-router';
import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import NotFoundBlock from './pages/NotFound';

function App() {
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/not-found" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
