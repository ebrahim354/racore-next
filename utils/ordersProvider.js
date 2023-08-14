import orders from './orders'
import axios from 'axios';
import { url, ordersRoute } from './urlProvider';



/*
orders should adhere to the following schema:
type Order {
  customerName: string!
  phoneNumber: string!
  id: ID!
  total: Float!
  items: Product[] + size + amount!
}
*/
async function fetchOrders() {
  const config = {
    headers: { Authorization: `Bearer ${window.localStorage.getItem('jwt')}` },
  };
  const res = await axios.get(url + ordersRoute, config);
  const orders = res.data.data.orders;
  for(let i = 0; i < orders.length; i++){
    let total = 0;
    for(let j = 0; j < orders[i].items.length; j++){
      total += (orders[i].items[j].price * orders[i].items[j].amount);
    }
    orders[i].total = total;
  }

  console.log('orders: ', orders);
  return orders; 
}

export {
  fetchOrders, orders as staticOrders
}