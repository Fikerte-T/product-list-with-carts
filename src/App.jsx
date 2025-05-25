
import './App.css'
import {useEffect, useState} from 'react'


function App() {
  const [products, setProducts] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)
  // const [clickedIndex, setClickedIndex] = useState(null)

  const handleToggle = (clickedProd) => {
    setProducts(prevProducts => {
      const updatedProducts =  prevProducts.map((prod) => prod.id === clickedProd.id ? {...prod, isSelected: true, prodAmount: 1} : prod)  
      const updatedProduct = updatedProducts.find(p => p.id === clickedProd.id);
      displayCart(updatedProduct); // Call with updated product
      return updatedProducts;  
    })
    // calculateTotal()

  }

  const displayCart = (selectedProd) => {
    if(cartItems.length === 0) {
      setCartItems([...cartItems, selectedProd])

    } 
    else {
      // const l = cartItems.find(p => p.name === selectedProd.name)
      if(cartItems.find(p => p.id === selectedProd.id) === undefined) {
        // setCartItems(prevCartItems => [...prevCartItems, selectedProd])
      setCartItems([...cartItems, selectedProd])

      }  

      // console.log(l)
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

  const confirmOrder = () => {
    
  }
  
  useEffect(() => {
    calculateTotal()
  }, [cartItems])
  
  useEffect(() => {
    fetch('../data.json')
    .then(res => res.json())
    .then(data => setProducts(data))
    
  }, [])
  // console.log(cartItems)
// console.log(products)
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
          <div className='p-4'>  
            <h2 className='text-3xl font-bold text-custom-red'>{`Your cart (${cartItems.length})`}</h2>
            {cartItems.length ? 
            (
            <>
              {
                cartItems.map((item, index) => (
                  <div key={index} className='flex items-center justify-between'>
                    <div className='text-lg font-semibold p-4 w-full border-b-2 border-custom-rose100 space-y-2'>
                      <p className='text-custom-rose900'>{item.name}</p>
                      <div className='flex w-[150px] justify-between'>
                        <p className='text-custom-red'>{`${item.prodAmount}x`}</p>
                        <p className='text-custom-rose400 font-normal'>{`@ $${item.price}`}</p>
                        <p className='text-custom-rose400'>{`$${item.price * item.prodAmount}`}</p>
                      </div>
                    </div>
                    <img src="../assets/images/icon-remove-item.svg" alt="remove icon" className='border-1 border-custom-rose300 rounded-full p-0.5'/>
                  </div>
                ))
              }
              <div className='flex justify-between items-center py-8 px-4'>
                <p className='text-custom-rose500 font-semibold text-lg'>Order Total</p>
                <p className='text-custom-rose900 font-bold text-3xl'>{`$${total}`}</p>
              </div>
              <div className='flex justify-center bg-custom-rose100 p-4 rounded-lg'>
                <img src="../assets/images/icon-carbon-neutral.svg" alt="carbon neutral icon" />
                <p className='pl-2 text-custom-rose500'>This is a <span className='font-bold'>carbon neutral</span> delivery</p>
              </div>
              <button className='bg-custom-red text-custom-rose50 w-full p-4 my-8 rounded-4xl text-lg font-bold hover:bg-custom-red/80' onClick={() => confirmOrder()}>Confirm Order</button>
            </>
            ) : 
            (
              <>
              <img src="../assets/images/illustration-empty-cart.svg" alt="empty cart illustation image" className='mx-auto my-6'/>
              <p className='text-custom-rose500 font-semibold text-center'>Your added items will appear here</p>
              </>
            )}
          </div>
        </section> 
      </div>
    </main>
  )
}

export default App
