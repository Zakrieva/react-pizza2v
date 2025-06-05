import React from 'react';

function Categories({ value, setCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div class="categories">
      <ul>
        {categories.map((name, i) => (
          <li key={i} onClick={() => setCategory(i)} className={value === i ? 'active' : ''}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Categories;
