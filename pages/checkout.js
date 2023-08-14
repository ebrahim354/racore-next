import { useState } from 'react'
import axios from 'axios'
import Head from 'next/head'
import { SiteContext, ContextProviderComponent } from "../context/mainContext"
import DENOMINATION from "../utils/currencyProvider"
import { FaLongArrowAltLeft } from "react-icons/fa"
import Link from "next/link"
import Image from "../components/Image"
import { v4 as uuid } from "uuid"
import {url, ordersRoute} from '../utils/urlProvider'


function CheckoutWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {context => (
            <Checkout {...props} context={context} />
        )}
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

const calculateShipping = () => {
  return 30;
}

const Input = ({ onChange, value, name, placeholder }) => (
  <input
    onChange={onChange}
    value={value}
    className="mt-2 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    type="text"
    placeholder={placeholder}
    name={name}
  />
)

const Checkout = ({ context }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [orderCompleted, setOrderCompleted] = useState(false)
  const [input, setInput] = useState({
    name: "",
    phoneNumber: ""
  })

  const { numberOfItemsInCart, cart, total } = context

  const onChange = e => {
    setErrorMessage(null)
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const { name, phoneNumber} = input
    const { total, clearCart } = context

    // Validate input
    if (!name || phoneNumber.length != 11) {
      setErrorMessage("Please fill in the form!")
      return
    }

    const order = {
      customerName: name,
      phoneNumber,
      items: [...cart],
    }
    const config = {
	    headers: { Authorization: `Bearer ${window.localStorage.getItem('jwt')}` },
    };
    try{
      console.log('order: ');
      const res = await axios.post(url + ordersRoute, order, config);
      console.log('orderres', res);
      this.clearForm()
    } catch(err){
      console.log(err);
    }
    setOrderCompleted(true)
    clearCart()
  }

  const cartEmpty = numberOfItemsInCart === Number(0)

  if (orderCompleted) {
    return (
      <div>
        <h3>Thanks! Your order has been successfully processed.</h3>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center pb-10">
      <Head>
        <title>Racore - Checkout</title>
        <meta name="description" content={`Check out`} />
        <meta property="og:title" content="Racore - Checkpit" key="title" />
      </Head>
      <div
        className="
            flex flex-col w-full
            c_large:w-c_large
          "
      >
        <div className="pt-10 pb-8">
          <h1 className="text-5xl font-light mb-6">Checkout</h1>
          <Link href="/cart">
            <a aria-label="Cart">
              <div className="cursor-pointer flex  items-center">
                <FaLongArrowAltLeft className="mr-2 text-gray-600" />
                <p className="text-gray-600 text-sm">Edit Cart</p>
              </div>
            </a>
          </Link>
        </div>

        {cartEmpty ? (
          <h3>No items in cart.</h3>
        ) : (
          <div className="flex flex-col">
            <div className="">
              {cart.map((item, index) => {
                return (
                  <div className="border-b py-10" key={index}>
                    <div className="flex items-center">
                      <Image
                        className="w-32 m-0"
                        src={url+item.image}
                        alt={item.name}
                      />
                      <p className="m-0 pl-10 text-gray-600">
                        {item.name}
                      </p>
                      <div className="flex flex-1 justify-end">
                        <p className="m-0 pl-10 text-gray-900 font-semibold">
                          {DENOMINATION + item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-1 flex-col md:flex-row">
              <div className="flex flex-1 pt-8 flex-col">
                <div className="mt-4 border-t pt-10">
                  <form onSubmit={handleSubmit}>
                    {errorMessage ? <span>{errorMessage}</span> : ""}
                    <Input
                      onChange={onChange}
                      value={input.name}
                      name="name"
                      placeholder="name"
                    />
                    <Input
                      onChange={onChange}
                      value={input.phoneNumber}
                      name="phoneNumber"
                      placeholder="Your whatsapp's number"
                    />
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="hidden md:block bg-primary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Confirm order
                    </button>
                  </form>
                </div>
              </div>
              <div className="md:pt-20">
                <div className="pl-4 flex flex-1 pt-2 md:pt-8 mt-2 sm:mt-0">
                  <p className="text-sm pr-10 text-left">Subtotal</p>
                  <p className="w-38 flex text-right justify-end">
                    {DENOMINATION + total}
                  </p>
                </div>
                <div className="pl-4 flex flex-1 my-2">
                  <p className="text-sm pr-10">Shipping</p>
                  <p className="w-38 flex justify-end">
                    {calculateShipping() == 0 ? "FREE SHIPPING" : calculateShipping()}
                  </p>
                </div>
                <div className="md:ml-4 pl-2 flex flex-1 bg-gray-200 pr-4 pb-1 pt-2 mt-2">
                  <p className="text-sm pr-10">Total</p>
                  <p className="font-semibold w-38 flex justify-end">
                    {DENOMINATION + (total + calculateShipping())}
                  </p>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="md:hidden bg-primary hover:bg-black text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Confirm order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutWithContext