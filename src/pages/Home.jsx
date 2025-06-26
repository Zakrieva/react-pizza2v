import { useSelector, useDispatch } from 'react-redux';
import React, { useContext } from 'react';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { SearchContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { currentPage, categoryId, sort } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = `&sortBy=${sort.sortType}`;
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://6829079e6075e87073a591ea.mockapi.io/items?page=${currentPage}&limit=4${category}${sortBy}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  
  React.useEffect(() => {
    console.log(categoryId);
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId: categoryId > 0 ? categoryId : null,
        sortType: sort.sortType,
        currentPage,
      });
      
      navigate(`/?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortType, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.sortType === params.sortType);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
    }
    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortType, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} setCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ?
          [...new Array(6)].map((_, i) => <Skeleton key={i} {...items} />)
        :  items.map((items, i) => <PizzaBlock key={i} {...items} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
export default Home;
