import React from 'react';

type CategoriesProps = {
  value: number;
  setCategory: (idx: number) => void;
};

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<CategoriesProps> = ({ value, setCategory }) =>{

  return (
    <div className="categories">
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
