import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { addItem, minusItem } from '../../features/cartSlice'

const BurgerBlock = ({ id, title, price, imageUrl }) => {
  const typeNames = ['тонкое', 'традиционное']
  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0);
  const dispatch = useDispatch()
  const cartItem = useSelector(state => state.cart.items.find(obj => obj.id === id))
  const addedCount = cartItem ? cartItem.count : 0
  const [text, setText] = useState('Хватит')

  const onClickAdd = () => {
    if(addedCount >= 5){
      setText(text)
    }
    const item = {
      id,
      title,
      price,
      imageUrl,
     
    };
    dispatch(addItem(item))
  }

  const onClickMinus = () => {
    
      dispatch(minusItem(id));
    
  };
 
    
    return (
      <div className="pizza-block-wrapper">
        <div className="pizza-block">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{title}</h4>
          
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            {addedCount === 0 ? (
              <button
                disabled={addedCount >= 5}
                onClick={onClickAdd}
                className="button button--outline button--add"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                    fill="white"
                  />
                </svg>
                <span>Добавить</span>
                {addedCount > 0 && <i>{addedCount}</i>}
              </button>
            ) : (
              <div className="addPizzaCard">
                <button onClick={onClickMinus}>-</button>
                <div style={{ color: "#fe5f1e", fontWeight: "bold" }}>
                  {addedCount}
                </div>
                <button onClick={onClickAdd}>+</button>
              </div>
            )}
          </div>
          {addedCount >= 5 ? text : ""}
        </div>
      </div>
    );
};

export default BurgerBlock;