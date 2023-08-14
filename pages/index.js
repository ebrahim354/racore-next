import Head from 'next/head'
import { Center, Footer, Tag, Showcase, DisplaySmall, DisplayMedium } from '../components'
import { titleIfy, slugify } from '../utils/helpers'
import { fetchInventory } from '../utils/inventoryProvider'
import CartLink from '../components/CartLink'
import { url } from '../utils/urlProvider'

const Home = ({ inventoryData = [], categories: categoryData = [] }) => {
  const inventory = inventoryData;


  return (
    <>
      <CartLink />
      <div className="w-full">
        <Head>
          <title>Racore</title>
          <meta name="description" content="Racore Swag store." />
          <meta property="og:title" content="Racore" key="title" />
        </Head>
      </div>
      <div className="pt-10 pb-6 flex flex-col items-center">
        <h2 className="text-4xl mb-3">Our products</h2>
        {/* <p className="text-gray-600 text-sm">Find the perfect piece or accessory to finish off your favorite room in the house.</p> */}
      </div>
      <div className="my-8 flex flex-col lg:flex-row justify-between flex-wrap">
        {inventory.map(inv => (
          <DisplaySmall
            key={inv.id}
            imageSrc={url+inv.image}
            title={inv.name}
            subtitle={inv.categories[0]}
            link={`/product/${slugify(inv.name)}`}
          />
        ))}
      </div>
    </>
  )
}

export async function getStaticProps() {
  const inventory = await fetchInventory()
  
  const inventoryCategorized = inventory.reduce((acc, next) => {
    const categories = next.categories
    categories.forEach(c => {
      const index = acc.findIndex(item => item.name === c)
      if (index !== -1) {
        const item = acc[index]
        item.itemCount = item.itemCount + 1
        acc[index] = item
      } else {
        const item = {
          name: c,
          image: next.image,
          itemCount: 1
        }
        acc.push(item)
      }
    })
    return acc
  }, [])
  
  return {
    props: {
      inventoryData: inventory,
      categories: inventoryCategorized
    },
    revalidate: 10
  }
}

export default Home