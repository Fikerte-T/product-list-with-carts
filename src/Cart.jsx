import React, { useEffect, useState } from 'react'
import Modal from './Modal'
const Cart = ({cartItems, total, setCartItems, products, setProducts}) => {
//   const [open, setOpen] = useState(false)
    const removeItem = (id) => {
        setProducts(prev => prev.map(prod => prod.id === id ? {...prod, isSelected: false} : prod))
        setCartItems(prev => prev.filter(item => item.id !== id))
    }
  return (
    
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
                    <button onClick={() => removeItem(item.id)}>
                      <img src="../assets/images/icon-remove-item.svg" alt="remove icon" className='border-1 border-custom-rose300 rounded-full p-0.5'/>

                    </button>
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
              {/* Modal toggle */}
            
            <button  data-modal-target="default-modal" data-modal-toggle="default-modal" type='button' className='bg-custom-red text-custom-rose50 w-full p-4 my-8 rounded-4xl text-lg font-bold hover:bg-custom-red/80' 
            // onClick={() => setOpen(true)}
            >Confirm Order</button>
        </>
        ) : 
        (
            <>
            <img src="../assets/images/illustration-empty-cart.svg" alt="empty cart illustation image" className='mx-auto my-6'/>
            <p className='text-custom-rose500 font-semibold text-center'>Your added items will appear here</p>
            </>
        )}
        <div>
            <>
                {/* main modal */}
                <div id="default-modal" aria-hidden='true' className='hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700"></div>
                             {/* <Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Terms of Service
                                </h3>
                            </div>
                               {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                {
                                    cartItems && cartItems.map((item, index) => (
                                    <div key={index} className='flex items-center justify-between'>
                                        <div className='text-lg font-semibold p-4 w-full border-b-2 border-custom-rose100 space-y-2'>
                                            <p className='text-custom-rose900'>{item.name}</p>
                                            <div className='flex w-[150px] justify-between'>
                                                <p className='text-custom-red'>{`${item.prodAmount}x`}</p>
                                                <p className='text-custom-rose400 font-normal'>{`@ $${item.price}`}</p>
                                                <p className='text-custom-rose400'>{`$${item.price * item.prodAmount}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className='flex justify-between items-center py-8 px-4'>
                                    <p className='text-custom-rose500 font-semibold text-lg'>Order Total</p>
                                    <p className='text-custom-rose900 font-bold text-3xl'>{`$${total}`}</p>
                                </div>
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                {/* <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button> */}
                                <button data-modal-hide="default-modal" type="button"
                                // onClick={onClose}
                                className='bg-custom-red text-custom-rose50 w-full p-4 my-8 rounded-4xl text-lg font-bold hover:bg-custom-red/80'
                                >
                                    Start another order
                                </button>
                            </div>
                        </div>
                
                </div>
            </>
      </div>
    </div>
  )
}

export default Cart