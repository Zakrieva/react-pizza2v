import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const FullPizza = () => {
   const [pizza, setPizza] = React.useState<{
     imageUrl: string;
     title: string;
     price: number;
   }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://6829079e6075e87073a591ea.mockapi.io/items/${id}`);
        return setPizza(data);
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};
