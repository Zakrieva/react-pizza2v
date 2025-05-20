import React from 'react';

import './scss/app.scss';

import Categories from './components/Categories';
import Sort from './components/Sort';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';

function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch('https://6829079e6075e87073a591ea.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
      });
  }, []);
  return (
    <div class="wrapper">
      <Header />
      <div class="content">
        <div class="container">
          <div class="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 class="content__title">Все пиццы</h2>
          <div class="content__items">
            {items.map((items) => (
              <PizzaBlock {...items} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
