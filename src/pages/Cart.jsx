import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { clearItem } from "../features/cartSlice";
import CartEmpty from "../components/CartEmpty";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import { chat_id, token } from "../key";
import { useTelegram } from "../../hooks/useTelegram";
 

const Cart = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState(null);
  const [fileActive, setFileActive] = useState();
  const { totalPrice, items } = useSelector((state) => state.cart);
  // const imageUrl = items.map((el) => el.imageUrl);
  const title = items.map((el) => el.title);
  const type = items.map((el) => el.type);
  const size = items.map((el) => el.size);
  const count = items.map((el) => el.count);
  const discount =
    totalPrice >= 2000 && totalPrice < 5000
      ? totalPrice / 10
      : 0 || totalPrice >= 5000
      ? totalPrice / 5
      : 0;

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm("Очистить корзину?")) {
      dispatch(clearItem());
    }
  };

   
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
      const data = {
        name,
        phone,
        address,
      };
      tg.sendData(JSON.stringify(data));
    }, [name, phone, address]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!name || !phone) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [name, phone])
  
  function handleSend() {
    setOpen(true)
    const url_api = `https://api.telegram.org/bot${token}/sendDocument`;
    const url_api2 = `https://api.telegram.org/bot${token}/sendMessage`;

    let message = `<i>Заявка на пиццу</i>\n`;
    message += `<b>Имя: </b>${name}\n`;
    message += `<b>Телефон: </b>${phone}\n`;
    message += `<b>Адрес: </b>${address}\n`;
    message += `<b>Пицца: </b>${title}\n`;
    message += `<b>Кол-во: </b>${count} <b>шт.</b>  <b>Всего:</b> ${totalCount} <b>шт.</b>\n`;
    message += `<b>Тесто: </b>${type}\n`;
    message += `<b>Размер: </b>${size}\n`;
    message += `<b>Сумма заказа: </b>${totalPrice} <b>₽</b>  <b>Скидка: </b> ${discount} <b>₽</b>  <b>Итого: </b> ${
      totalPrice - discount
    } <b>₽</b>\n`;
    // message += `Название: <a href="${imageUrl}"><b>${title}</b></a>`;
//  if(!file){

//     alert("Загрузите квитанцию !!!");
//  } else {
  
   axios.post(url_api2, {
     chat_id: chat_id,
     parse_mode: "html",
     text: message,
   });
   

   const formData = new FormData();
   formData.append("document", file);
   formData.append("chat_id", chat_id);

   axios.post(url_api, formData);
   setName("");
   setPhone("");
   setAddress("");
  //  window.alert("Заявка отправлена !!!");
   dispatch(clearItem());
    setFileActive()
    
 
}              
  if (!items.length) {
    return <CartEmpty />;
  }

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
    setFileActive(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Корзина
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 5H4.16667H17.5"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M8.33337 9.16667V14.1667"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M11.6666 9.16667V14.1667"
                stroke="#B6B6B6"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>

            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Всего пицц: <b>{totalCount} шт.</b>
            </span>
            <div className="totalPrice_discount">
              <span>
                Сумма заказа: <b>{totalPrice} ₽</b>
              </span>
              <span>
                Скидка: <b> {discount} ₽</b>
                <p>от 2т = 10% / от 5т = 20%</p>
              </span>
              <span>
                Итоговая сумма со скидкой: <b> {totalPrice - discount} ₽</b>
              </span>
            </div>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <svg
                width="8"
                height="14"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 13L1 6.93015L6.86175 1"
                  stroke="#D3D3D3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <span>Вернуться назад</span>
            </Link>
            {/* <div className="button pay-btn">
              <span onClick={handleSend}>Оплатить сейчас</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="order">
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <h2>Оформление заказа</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Имя Фамилия"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            name="phone"
            placeholder="+7904 000 80 80"
          />

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            name="address"
            placeholder="Адрес доставки"
          />

          <input className="photo_inp" type="file" onChange={onChangeFile} />
          {/* <iframe src={file}></iframe> */}
          <iframe src={fileActive} width="300px" height="200px"></iframe>

          {/* <a target="_blank" href={file}>
            Open
          </a> */}

          {/* <span>Итого: {totalPrice} руб.</span> */}
          <button style={{ marginTop: "50px" }} onClick={handleSend}>
            Оформить заказ
          </button>
         
        </form>
      </div>
    </div>
  );
};

export default Cart
