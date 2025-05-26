import './App.css'
import {useEffect, useState} from 'react'
import Cart from './Cart'

function App() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  
  const handleToggle = (clickedProd) => {
    setProducts(prevProducts => {
      const updatedProducts =  prevProducts.map((prod) => prod.id === clickedProd.id ? {...prod, isSelected: true, prodAmount: 1 } : prod)  
      const updatedProduct = updatedProducts.find(p => p.id === clickedProd.id);
      displayCart(updatedProduct)
      return updatedProducts;  
    })
  }

  const displayCart = (selectedProd) => {
    if(cartItems.length === 0) {
      setCartItems([...cartItems, selectedProd])

    } 
    else {
      if(cartItems.find(p => p.id === selectedProd.id) === undefined) {
        setCartItems([...cartItems, selectedProd])
      }  
    }
  }
  
  const calculateTotal = () => {
    let t = 0
    cartItems.map(p => t += p.prodAmount * p.price )
    setTotal(t)
  }

  const handleDecrement = (id) => {
    const updatedProducts = [...products]
    updatedProducts.map(p => p.id === id ? p.prodAmount = Math.max(p.prodAmount - 1, 1) : p.prodAmount)
    setProducts(updatedProducts)
    calculateTotal()
  }
  
  const handleIncrement = (id) => {
    const updatedProducts = [...products]
    updatedProducts.map(p => p.id === id ? p.prodAmount = p.prodAmount + 1: p.prodAmount)
    setProducts(updatedProducts)
    calculateTotal()
  }
  
  useEffect(() => {
    calculateTotal()
  }, [cartItems])
  
  useEffect(() => {
    fetch('../data.json')
    .then(res => res.json())
    .then(data => {
      const updatedData = data.map(prod => (
        {...prod, price: (prod.price).toFixed(2) } // string
      ))
      setProducts(updatedData)
    })   
  }, [])

  return (
    <main className='bg-custom-rose50 min-h-screen font-primary'>
      <div className='grid grid-cols-1 place-items-center lg:grid-cols-3 lg:place-items-start gap-10 p-20' >
        <section className='col-span-2'>
          <h1 className='text-5xl pb-8 font-bold text-custom-rose900'>Desserts</h1>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {
              products.length > 0 ? 
              products.map((p, index)=> (
                <div key={index} className='relative py-4'>
                     <picture>
                        <source srcSet={p.image.mobile} media="(max-width: 639px)" />
                        <img onClick={() => handleToggle(p)} src={p.image.desktop} alt="Product" className={`'rounded-lg ${p.isSelected ? 'border-2 border-custom-red rounded-lg' : 'border border-transparent'}`} />
                      </picture>
                        
                        {p.isSelected ? 

                        <div className='flex justify-around items-center bg-custom-red border-custom-red rounded-full border-[1px] w-[70%] py-2 lg:py-1 xl:py-3 min-w-1/2 text-white font-semibold text-sm absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                          <button className='border-1 rounded-full border-custom-rose50 px-1 py-2' onClick={() => handleDecrement(p.id)}>
                            <img src='../assets/images/icon-decrement-quantity.svg' alt='decrement icon'/> 
                          </button>
                          <p>{p.prodAmount}</p>
                          <button className='border-1 rounded-full border-custom-rose50 p-1' onClick={() => handleIncrement(p.id)}>
                            <img src='../assets/images/icon-increment-quantity.svg' alt='increment icon' /> 
                          </button>
                        </div>
                        : 
                        (
                        <>
                          <button 
                            onClick={() => handleToggle(p)}
                            className={`flex justify-center items-center border-custom-rose400 rounded-full border-[1px] w-[70%] py-2 lg:py-1 xl:py-3 min-w-1/2 text-custom-rose900 bg-white font-semibold text-sm absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:text-custom-rose50 hover:bg-custom-red
                              `}
                              >
                            <img src="../assets/images/icon-add-to-cart.svg" className='pr-2 lg:size-6 xl:size-max' alt="" /> Add to Cart
                          </button>
                        </>
                        )}
                          
                  <p className='text-custom-rose400 text-sm mt-10'>{p.category}</p>
                  <h3 className='text-custom-rose900 font-semibold'>{p.name}</h3>
                  <p className='text-custom-red text-lg font-bold'>{p.price}</p>
                </div>
              ))
              : (<p> No products </p>)
            }
          </div>
        </section>
        <section className='bg-white h-fit rounded-lg px-4 place-self-stretch'>
          <Cart cartItems = {cartItems} total={total} products={products} setCartItems = {setCartItems} setProducts={setProducts}/>
        </section> 
      </div>
      
    </main>
  )
}

export default App
