// import { chat_id, token } from "../key";

// export const handleBotTg = () => {
//   const url_api = `https://api.telegram.org/bot${token}/sendDocument`;
//   const url_api2 = `https://api.telegram.org/bot${token}/sendMessage`;

//   let message = `<i>Заявка на пиццу</i>\n`;
//   message += `<b>Имя: </b>${name}\n`;
//   message += `<b>Телефон: </b>${phone}\n`;
//   message += `<b>Адрес: </b>${address}\n`;
//   message += `<b>Пицца: </b>${title}\n`;
//   message += `<b>Кол-во: </b>${count} <b>шт.</b>  <b>Всего:</b> ${totalCount} <b>шт.</b>\n`;
//   message += `<b>Тесто: </b>${type}\n`;
//   message += `<b>Размер: </b>${size}\n`;
//   message += `<b>Сумма заказа: </b>${totalPrice} <b>₽</b>  <b>Скидка: </b> ${discount} <b>₽</b>  <b>Итого: </b> ${
//     totalPrice - discount
//   } <b>₽</b>\n`;
//   // message += `Название: <a href="${imageUrl}"><b>${title}</b></a>`;
//   //  if(!file){

//   //     alert("Загрузите квитанцию !!!");
//   //  } else {

//   axios.post(url_api2, {
//     chat_id: chat_id,
//     parse_mode: "html",
//     text: message,
//   });

//   const formData = new FormData();
//   formData.append("document", file);
//   formData.append("chat_id", chat_id);

//   axios.post(url_api, formData);
// };
