import React from 'react';

const Categories = () => {
  const [ activeIndex, setActiveIndex ] = React.useState(0)
  
  const categories = ['Все','Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
  
  
  const handleClickCategory = (index) => {
    setActiveIndex(index)
  }

    return (
      <div className="categories">
        <ul>
          {categories.map((el, index) => {
            return (
              <li key={index}
                onClick={() => handleClickCategory(index)}
                className={activeIndex === index ? "active" : ""}
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