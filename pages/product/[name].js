import { useState } from 'react'
import Head from 'next/head'
import Button from '../../components/Button'
import Image from '../../components/Image'
import QuantityPicker from '../../components/QuantityPicker'
import { fetchInventory } from '../../utils/inventoryProvider'
import { slugify } from '../../utils/helpers'
import CartLink from '../../components/CartLink'
import { SiteContext, ContextProviderComponent } from '../../context/mainContext'
import DENOMINATION from '../../utils/currencyProvider'
import { url } from '../../utils/urlProvider'


  function ChevronDownSmallIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        fillRule="evenodd"
      />
    </svg>
  )
}


const ItemView = (props) => {
  const variantList = ['Small', 'Medium', 'Larg', 'XL', 'XXL', 'XXXL'];
  const [numberOfitems, updateNumberOfItems] = useState(1)
  const { product } = props
  const { price, image, name, description } = product
  const { context: { addToCart }} = props
  const [activeVariantId, setActiveVariantId] = useState(variantList[0]);

  function addItemToCart (product) {
    product["quantity"] = numberOfitems
    product.size = activeVariantId
    console.log("prod: ", product)
    addToCart(product)
  }


  const updateVariant = (event) => setActiveVariantId(event.target.value)

  function increment() {
    updateNumberOfItems(numberOfitems + 1)
  }

  function decrement() {
    if (numberOfitems === 1) return
    updateNumberOfItems(numberOfitems - 1)
  }

  return (
    <>
      <CartLink />
      <Head>
        <title> Racore - {name}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={`Racore - ${name}`} key="title" />
      </Head>
      <div className="
        sm:py-12
        md:flex-row
        py-4 w-full flex flex-1 flex-col my-0 mx-auto
      ">
        <div className="w-full md:w-1/2 h-120 flex flex-1 bg-light hover:bg-light-200">
          <div className="py-16 p10 flex flex-1 justify-center items-center">
            <Image src={url+image} alt="Inventory item" className="max-h-full" />
          </div>
        </div>
        <div className="pt-2 px-0 md:px-10 pb-8 w-full md:w-1/2">
          <h1 className="
           sm:mt-0 mt-2 text-5xl font-light leading-large
          ">{name}</h1>
          <h2 className="text-2xl tracking-wide sm:py-8 py-6">{DENOMINATION + price}</h2>
          {/* <p className="text-gray-600 leading-7">{description}</p> */}

             <div className="my-6">
              <div className="md:w-3/4 px-3 mb-6">

              <label
                className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                htmlFor="style"
              >
                Quantity
              </label>
            <QuantityPicker
              increment={increment}
              decrement={decrement}
              numberOfitems={numberOfitems}
              hideQuantityLabel={true}
            />
            </div>
            </div>
          <div className="my-6">
           <div className="md:w-3/4 px-3 mb-6">
              <label
                className="block text-sm font-bold tracking-widest uppercase mb-2 text-slategray"
                htmlFor="style"
              >
                Size
              </label>
              <div className="relative">
                <select
                  id="style"
                  name="style"
                  value={activeVariantId}
                  className="block appearance-none w-full bg-gainsboro border-2 border-gainsboro focus:border-slategray px-4 py-3 pr-8 focus:outline-none focus:bg-white text-slategray focus:text-slategray rounded-lg"
                  onChange={updateVariant}
                >
                  {variantList.map((variant) => (
                    <option key={variant} value={variant}>
                      {variant}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 px-2 flex items-center">
                  <ChevronDownSmallIcon
                    className="h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            full
            title="Add to Cart"
            onClick={() => addItemToCart(product)}
          />
        </div>
      </div>
    </>
  )
}

export async function getStaticPaths () {
  const inventory = await fetchInventory()
  const paths = inventory.map(item => {
    return { params: { name: slugify(item.name) }}
  })
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  const name = params.name.replace(/-/g," ")
  const inventory = await fetchInventory()
  const product = inventory.find(item => slugify(item.name) === slugify(name))

  return {
    props: {
      product,
    }
  }
}

function ItemViewWithContext(props) {
  return (
    <ContextProviderComponent>
      <SiteContext.Consumer>
        {
          context => <ItemView {...props} context={context} />
        }
      </SiteContext.Consumer>
    </ContextProviderComponent>
  )
}

export default ItemViewWithContext