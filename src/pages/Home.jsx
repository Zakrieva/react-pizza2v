import {useSelector, useDispatch} from 'react-redux';
import React, { useContext } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import {setCategoryId, setCurrentPage} from '../redux/slices/filterSlice'
import { SearchContext } from '../App';

function Home() {
  const dispatch = useDispatch()

  const { searchValue} = useContext(SearchContext)

  const {currentPage,categoryId, sort } = useSelector((state)=> state.filter);
  

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  

  const onChangeCategory = (id)=>{
    dispatch(setCategoryId(id))
  }
  const onChangePage =(number)=>{
    dispatch(setCurrentPage(number))
  }
  
  React.useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sort.sortType;
    const search = searchValue ? `&search=${searchValue}` : '';
    
    axios
    .get(
      `https://6829079e6075e87073a591ea.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}${search}`
    )
    .then((res) => {
      setItems(res.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortType, searchValue, currentPage]);

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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
export default Home;
