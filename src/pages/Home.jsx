import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';

function Home({ searchValue }) {
  const [items, setItems] = React.useState([]);
  const [sortView, setSortView] = React.useState({
    name: 'популярности',
    sortType: 'rating',
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [curentPage, setCurentPage] = React.useState(1);
  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortView.sortType;
    const search = searchValue ? `&search=${searchValue}` : '';

    fetch(
      `https://6829079e6075e87073a591ea.mockapi.io/items?page=${curentPage}&limit=4${category}&sortBy=${sortBy}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortView, searchValue, curentPage]);
  return (
    <div class="container">
      <div class="content__top">
        <Categories value={categoryId} setCategory={(i) => setCategoryId(i)} />
        <Sort value={sortView} setSort={(SortView) => setSortView(SortView)} />
      </div>
      <h2 class="content__title">Все пиццы</h2>
      <div class="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} {...items} />)
          : items.map((items, i) => <PizzaBlock key={i} {...items} />)}
      </div>
      <Pagination onPageChange={(number) => setCurentPage(number)} />
    </div>
  );
}
export default Home;
