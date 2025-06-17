import {useSelector, useDispatch} from 'react-redux';
import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import {setCategoryId} from '../redux/slices/filterSlice'

function Home({ searchValue }) {
  const dispatch = useDispatch()

  const categoryId = useSelector((state)=> state.filter.categoryId);
  const sort = useSelector((state)=> state.filter.sort);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [curentPage, setCurentPage] = React.useState(1);

  const onChangeCategory = (id)=>{
    console.log(id);
    dispatch(setCategoryId(id))
  }
  
  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sort.sortType;
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
  }, [categoryId, sort, searchValue, curentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} {...items} />)
          : items.map((items, i) => <PizzaBlock key={i} {...items} />)}
      </div>
      <Pagination onPageChange={(number) => setCurentPage(number)} />
    </div>
  );
}
export default Home;
