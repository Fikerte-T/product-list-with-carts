
import './App.css'
import {useEffect, useState} from 'react'


function App() {
  const [products, setProducts] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState([  
    // {
    //    "image": {
    //         "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
    //         "mobile": "./assets/images/image-waffle-mobile.jpg",
    //         "tablet": "./assets/images/image-waffle-tablet.jpg",
    //         "desktop": "./assets/images/image-waffle-desktop.jpg"
    //    },
    //    "name": "Waffle with Berries",
    //    "category": "Waffle",
    //    "price": 6.50,
    //    "isSelected": true,
    //    "prodAmount": 1,
    // },
  ])
  // const [clickedIndex, setClickedIndex] = useState(null)

  const handleToggle = (clickedProd) => {
    setProducts(prevProducts => {
      const updatedProducts =  prevProducts.map((prod) => prod.id === clickedProd.id ? {...prod, isSelected: true, prodAmount: 1} : prod)  
      const updatedProduct = updatedProducts.find(p => p.id === clickedProd.id);
      displayCart(updatedProduct); // Call with updated product
      return updatedProducts;  
    })
    // displayCart(clickedProd.id)
    
  }

  const displayCart = (selectedProd) => {
    // const updatedProducts = [...products]
    // console.log(products)
    // const selectedProd = products.find(p => p.id === id)
    // console.log(selectedProd)
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

  const handleDecrement = (id) => {

    const updatedProducts = [...products] //cartItems not products
    setProducts(updatedProducts.map(p => p.id === id ? p.prodAmount = Math.max(p.prodAmount - 1, 1) : p.prodAmount))
    // updatedProducts[i].prodAmount = Math.max(updatedProducts[i].prodAmount - 1, 1)
    // setProducts(updatedProducts)
  }
  
  const handleIncrement = (id) => {
    const updatedProducts = [...products] //cartItems not products
    // updatedProducts[i].prodAmount = updatedProducts[i].prodAmount + 1
    setProducts(updatedProducts.map(p => p.id === id ? p.prodAmount = p.prodAmount + 1: p.prodAmount))

    // setProducts(updatedProducts)
  }

  // useEffect(() => {
  //   // const incart = cartItems.includes(products[clickedIndex].name)
  //   // console.log(clickedIndex)
  //   // console.log(products[clickedIndex])
  //   const incart = products[clickedIndex]
  //   // console.log(incart ? incart.name : 'no')
  //   // products.length > 0 ? console.log('produts') : console.log('no product')
  //   if (clickedIndex !== null && incart !== null) {
  //     const updatedProduct = products.find((p, i)=> i === clickedIndex);
  //     // console.log(updatedProduct)
  //     if(updatedProduct && updatedProduct.isSelected) {
  //      // console.log(updatedProduct);  // Should log the updated product with isSelected and prodAmount
  //       displayCart(updatedProduct);
  //     }
  //   }
  // }, [products, clickedIndex])
  
  useEffect(() => {
    fetch('../data.json')
    .then(res => res.json())
    .then(data => setProducts(data))
    
  }, [])
  console.log(cartItems)
// console.log(products)
  return (
    <main className='bg-custom-rose50 min-h-screen font-primary'>
      <div className='grid grid-cols-1 place-items-center lg:grid-cols-3 lg:place-items-start gap-10 p-20' >
        <section className='col-span-2'>
          <h1 className='text-5xl pb-8 font-bold text-custom-rose900'>Desserts</h1>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {
              // console.log(products)
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
        <section className='bg-white h-fit rounded-lg p-4'>
          <div className='p-4'>  
            <h2 className='text-3xl font-bold text-custom-red'>{`Your cart (${cartItems.length})`}</h2>
            {cartItems.length ? 
            (
            <>
              {
                cartItems.map((item, index) => (
                  <div key={index}>
                    <p>{item.name}</p>
                    <div>
                      <p>{`${item.prodAmount}x`}</p>
                      <p>{`@ $${item.price}`}</p>
                      <p>{`$${item.price * item.prodAmount}`}</p>
                    </div>
                    <img src="../assets/images/icon-remove-item.svg" alt="remove icon" className='border-1 border-custom-rose300 rounded-full p-0.5'/>
                  </div>

                ))
              }
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
