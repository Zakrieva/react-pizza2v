import { useSelector, useDispatch } from 'react-redux';
import React, { useContext } from 'react';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { currentPage, categoryId, sort, searchValue } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);
  

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = `&sortBy=${sort.sortType}`;
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
     // @ts-ignore
      fetchPizzas({ currentPage, category, sortBy, search }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    
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
      getPizzas();
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
      {status === 'error' ?
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      : <div className="content__items">
          {status === 'loading' ?
            [...new Array(4)].map((_, i) => <Skeleton key={i} {...items} />)
          : items.map((item) => (
              <Link key={item.id} to={`/pizza/${item.id}`} >
                <PizzaBlock  {...item} />
              </Link>
            ))
          }
        </div>
      }

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
export default Home;
