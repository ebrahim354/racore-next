import { v4 as uuid } from 'uuid'

/*
orders should adhere to the following schema:
type Order {
  cutomerName: string!
  phoneNumber: string!
  id: ID!
  total: Float!
  items: Product[]!
}
*/


let orders = [
  {
    customerName: "Ibrahim",
    phoneNumber: "00000000000",
    id: 1,
    total: 5000,
    items: [
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
    ]
  },
  {
    customerName: "Ibrahim",
    phoneNumber: "00000000000",
    id: 2,
    total: 5000,
    items: [
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
      {
        categories: ['sofas', 'living room'],
        name: 'Carmel Brown Sofa', 
        price: '1000', 
        image: '/products/couch5.png', 
        description: '.' , 
        brand: 'Jason Bourne' , 
        currentInventory: 2,
        amount: 1,
        size: 'Small',
      },
    ]
  },


]

orders.map(i => {
  i.id = uuid()
  return i
})

export default orders