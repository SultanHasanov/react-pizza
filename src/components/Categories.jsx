import React from 'react';

const Categories = ({ value, onChangeCategory }) => {
  // const [activeIndex, setActiveIndex] = React.useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  // const handleClickCategory = (index) => {
  //   setActiveIndex(index);
  // };

  return (
    <div className="categories">
      <ul>
        {categories.map((el, index) => {
          return (
            <li
              key={index}
              onClick={() => onChangeCategory(index)}
              className={value === index ? "active" : ""}
            >
              {el}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;