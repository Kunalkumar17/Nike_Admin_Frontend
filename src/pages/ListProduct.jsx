import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { currency } from '../App';

export const ListProduct = () => {

  const [products , setProducts] = useState([]);

  const getProducts = async() =>{
  try{
    const response = await fetch(backendUrl+'/product/list',{
      method: 'POST',
    })
    const data = await response.json();
    console.log(data);
    setProducts(data);
  }
  catch(err){
    console.log(err);
    toast.error(err.message)
  }
}

  useEffect(() => {
    getProducts()
  },[])

  const removeProduct = async(id) =>{
    console.log(id)
    try{
    const response = await fetch(backendUrl+'/product/remove',{
      method: 'POST',
      body: JSON.stringify({id}),
      headers: { 'Content-Type' : 'application/json' }  
    })

    const data = await response.json();
    if(data == 'Product Removed'){
      toast.success(data);
      await getProducts();
    }
  }
  catch(err){
    console.log(err);
    toast.error(err.message);
  }

  }


  return (
    <div>
      <>
        <p className='mb-2'>All Products List</p>
        <div className='flex flex-col gap-2'>

          <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
          </div>

          <div className=''>
            { 
              products.map((product , index) => (
                <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm mb-2' key={index}>
                  <img className='w-12' src={product.image[0]} alt=''></img>
                  <p>{product.name}</p>
                  <p>{product.category}</p>
                  <p>{currency}{product.price}</p>
                  <p onClick={() => removeProduct(product._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
                </div>
              ))
            }
          </div>

        </div>
      </>
    </div>
  )
}
