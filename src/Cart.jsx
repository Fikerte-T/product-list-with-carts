import React, { useState } from 'react'
import Modal from './Modal'
const Cart = ({cartItems, total, setCartItems, products, setProducts}) => {
    const [open, setOpen] = useState(false)

    const removeItem = (id) => {
        setProducts(prev => prev.map(prod => prod.id === id ? {...prod, isSelected: false} : prod))
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const resetProducts = () => {
        setOpen(false)
        setProducts(prev => prev.map(prod => ({...prod, isSelected: false})))
        setCartItems([])
    }

  return (
    
    <div className='p-4'>  
        <h2 className='text-3xl font-bold text-custom-red'>{`Your Cart (${cartItems.length})`}</h2>
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
                    <button onClick={() => removeItem(item.id)}>
                      <img src="./assets/images/icon-remove-item.svg" alt="remove icon" className='border-1 border-custom-rose300 rounded-full p-0.5'/>

                    </button>
                </div>
            ))
            }
            <div className='flex justify-between items-center py-8 px-4'>
                <p className='text-custom-rose500 font-semibold text-lg'>Order Total</p>
                <p className='text-custom-rose900 font-bold text-3xl'>{`$${total}`}</p>
            </div>
            <div className='flex justify-center bg-custom-rose100 p-4 rounded-lg'>
                <img src="./assets/images/icon-carbon-neutral.svg" alt="carbon neutral icon" />
                <p className='pl-2 text-custom-rose500'>This is a <span className='font-bold'>carbon neutral</span> delivery</p>
            </div>
              {/* Modal toggle */}
       
            <button className='bg-custom-red text-custom-rose50 w-full p-4 my-8 rounded-4xl text-lg font-bold hover:bg-custom-red/80' 
            onClick={() => setOpen(true)}
            >
            Confirm Order
            </button> 
            
            <Modal open={open} onClose={() => setOpen(false)}>
                <div className='space-y-2'>
                    <img src="./assets/images/icon-order-confirmed.svg" alt="order confirmed icon" />
                    <h2 className='text-custom-rose900 text-4xl font-extrabold'>Order Confirmed</h2>
                    <p className='text-custom-rose400 text-sm'>We hope you enjoy your food!</p>
                </div>       
                <div className="p-4 md:p-5 bg-custom-rose50 rounded-lg my-4">
                    {
                        cartItems && cartItems.map((item, index) => (
                        <div key={index} className='flex items-center justify-between border-b-1 border-custom-rose100'>
                            <div className='text-lg font-semibold p-4 w-full'>
                                <p className='text-custom-rose900'>{item.name}</p>
                                <div className='flex w-[150px] justify-between '>
                                    <p className='text-custom-red'>{`${item.prodAmount}x`}</p>
                                    <p className='text-custom-rose400 font-normal'>{`@ $${item.price}`}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='flex justify-between items-center py-8 px-4'>
                        <p className='text-custom-rose500 font-semibold text-lg'>Order Total</p>
                        <p className='text-custom-rose900 font-bold text-3xl'>{`$${total}`}</p>
                    </div>
                </div>
                
                <div className="">
                    <button 
                    onClick={() => resetProducts()}
                    className='bg-custom-red text-custom-rose50 w-full p-4 my-8 rounded-4xl text-lg font-bold hover:bg-custom-red/80'
                    >
                        Start another order
                    </button>
                </div> 
            </Modal>
        </>
        ) : 
        (
            <>
            <img src="./assets/images/illustration-empty-cart.svg" alt="empty cart illustation image" className='mx-auto my-6'/>
            <p className='text-custom-rose500 font-semibold text-center'>Your added items will appear here</p>
            </>
        )}
    </div>
  )
}

export default Cart