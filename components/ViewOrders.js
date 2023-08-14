import React from 'react'
import { fetchOrders } from '../utils/ordersProvider'
import DENOMINATION from '../utils/currencyProvider'
import Image from '../components/Image'
import Link from 'next/link'
import { slugify } from '../utils/helpers'
import { FaTimes } from 'react-icons/fa'
import { url,  ordersRoute} from '../utils/urlProvider'


class ViewOrders extends React.Component {
  state = {
    orders: [],
  }
  componentDidMount() {
    this.fetchOrders()
  }
  fetchOrders = async() => {
    const orders = await fetchOrders()
    this.setState({ orders })
  }
  deleteItem = async index => {
    const config = {
	    headers: { Authorization: `Bearer ${window.localStorage.getItem('jwt')}` },
    };
    try{
      const res = await axios.delete(`${url + ordersRoute}/${this.state.orders[index].id}`, config);
      console.log('del', res);
    } catch (err){
      console.log(err);
    }

    const orders = [...this.state.orders.slice(0, index), ...this.state.orders.slice(index + 1)]
    this.setState({ orders })
  }
  render() {
    const { orders } = this.state
    return (
      <div>
        <h2 className="text-3xl">Orders</h2>
        {
          orders.map((order, index) => {
            return (
              <div className="border-b py-10 flex-col" key={order.id}>
                <div className="flex items-center">
                  <div className='m-4 flex'>
                    <h4 className='font-bold' >Customer Name: </h4>
                    <p className="m-0 pl-10 text-gray-600 text-sm">
                      {order.customerName}
                    </p>
                  </div>

                  <div className='m-4 flex'>
                    <h4 className='font-bold' >Phone: </h4>
                    <p className="m-0 pl-10 text-gray-600 text-sm">
                      {order.phoneNumber}
                    </p>
                  </div>

                  <div className="flex flex-1 justify-end">
                    <h4 className='font-bold' >Total: </h4>
                    <p className="m-0 pl-20 text-gray-900 font-semibold">
                      {DENOMINATION + (order.total)}
                    </p>
                  </div>
                  <div className="flex items-center m-0 ml-10 text-gray-900 text-s cursor-pointer">
                    <FaTimes onClick={() => this.deleteItem(index)} />
                  </div>
                </div>
                <div className='m-4'>
                  <h4 className='font-bold mb-4' >Items: </h4>
                  <ul className="flex-col items-center">
                    {order.items.map(item => <li className='flex'>
                  <Link href={`/product/${slugify(item.name)}`}>
                    <a>
                      <Image className="w-32 m-0" src={url+item.image} alt={item.name} />
                    </a>
                  </Link>
                  <Link href={`/product/${slugify(item.name)}`}>
                    <a>
                      <p className="m-0 pl-10 text-gray-600 text-sm">
                        {item.name}
                      </p>
                    </a>
                  </Link>
                  <div className="flex ml-4 flex-1">
                    <h4 className='font-bold' >Total: </h4>
                    <p className="m-0 pl-20 text-gray-900 font-semibold">
                      {DENOMINATION + (Number(item.price) * Number(item.amount))}
                    </p>
                  </div>

                  <div className="flex ml-4 flex-1">
                    <h4 className='font-bold' >amount: </h4>
                    <p className="m-0 pl-20 text-gray-900">
                      {item.amount}
                    </p>
                  </div>

                  <div className="flex ml-4 flex-1">
                    <h4 className='font-bold' >size: </h4>
                    <p className="m-0 pl-20 text-gray-900">
                      {item.size}
                    </p>
                  </div>
                      
                    </li>)}
                  </ul>
                </div>

              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ViewOrders