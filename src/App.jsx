
import './App.css'
import {useEffect, useState} from 'react'


function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    fetch('../data.json')
    .then(res => res.json())
    .then(data => setProducts(data))
    
  }, [])
console.log(products)
  return (
    <main className='bg-custom-rose50 min-h-screen font-primary'>
      <div className='grid grid-cols-3 gap-10 p-20' >
        <section className='col-span-2'>
          <h1 className='text-5xl pb-8 font-bold text-custom-rose900'>Desserts</h1>
          <div className='grid grid-cols-3 gap-8'>
            {
              products.map(p => (
                <div className='relative'>
                  <img src={p.image.desktop} className='rounded-lg' />
                  <button className='flex items-center justify-center border-custom-rose400 rounded-full border-[1px] py-3 px-6 min-w-1/2 text-custom-rose900 bg-white font-semibold text-sm absolute left-1/4 transform -translate-x-1/8 -translate-y-1/2'>
                  <img src="../assets/images/icon-add-to-cart.svg" className='pr-2' alt="" />
                    Add to Cart</button>
                  <p className='text-custom-rose400 text-sm mt-10'>{p.category}</p>
                  <h3 className='text-custom-rose900 font-semibold'>{p.name}</h3>
                  <p className='text-custom-red text-lg font-bold'>{p.price}</p>
                </div>
              ))
            }
          </div>
        </section>
        <section className='bg-white h-fit rounded-lg p-4'>
          <div className='p-4'>  
            <h2 className='text-3xl font-bold text-custom-red'>Your cart</h2>
            <img src="../assets/images/illustration-empty-cart.svg" alt="empty cart illustation image" className='mx-auto my-6'/>
            <p className='text-custom-rose500 font-semibold text-center'>Your added items will appear here</p>
          </div>
        </section> 
      </div>
    </main>
  )
}

export default App
