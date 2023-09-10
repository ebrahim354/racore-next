import inventory from './inventory'

import axios from 'axios';
import { url, productsRoute } from './urlProvider';


/*
Inventory items should adhere to the following schema:
type Product {
  id: ID!
  categories: [String]!
  price: Float!
  name: String!
  image: String!
  description: String!
  currentInventory: Int!
  brand: String
  sku: ID
}
*/

let fetched = false;
let products;

const fetchInventory = async () => {
    if(fetched) return products;
    const res = await axios.get(
        url + productsRoute
    );
    products = res.data.data.products;
    for(let i = 0; i < products.length; i++){
      // just for now.
      products[i].categories = ['T-shirts'];
    }
    fetched = true;
    return products; 
}; 

(()=> (setInterval(() => fetchInventory(), 10000)))()


export {
  fetchInventory, inventory as staticInventory
}