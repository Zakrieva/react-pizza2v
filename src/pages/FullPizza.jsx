import axios from 'axios';
import react from 'react';
import { useParams } from 'react-router-dom';

export const FullPizza = () => {
    const {pizza, setPizza} = react.useState()
    const { id } = useParams()

    react.useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                  `https://6829079e6075e87073a591ea.mockapi.io/items/${id}`,
                );
                
                return setPizza(data)
            } catch (error) {
                alert('ошибка при получении пиццы')
            }
        }
        fetchPizza()
    },[])
    if (!pizza) {
        return "Загрузка..."
    }
  return (
      <div>
          <img src="" alt="" />
          <h2></h2>
          <p></p>
      <h3></h3></div>
  )
}
