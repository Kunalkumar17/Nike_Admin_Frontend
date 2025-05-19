import React, { useState } from 'react'
import {assets} from '../assets/assets'
import { backendUrl } from '../App'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AddProduct = () => {

  const [image1 , setImage1] = useState(false)
  const [image2 , setImage2] = useState(false)
  const [image3 , setImage3] = useState(false)
  const [image4 , setImage4] = useState(false)

  const [name , setName] = useState('');
  const [description , setDescription] = useState('');
  const [sizes , setSizes] = useState([]);
  const [price , setPrice] = useState("");
  const [category , setCategory] = useState('Men');
  const [bestseller , setBestseller] = useState(false); 
  const [style , setStyle] = useState('');
  const [colour , setColour] = useState('');

  const onSubmitHandler = async(e) => {
    e.preventDefault(); 
    try{
        const formData = new FormData();
        formData.append("name",name);
        formData.append("description",description);
        formData.append("price",price);
        formData.append("category",category);
        formData.append("bestseller",bestseller);
        formData.append("sizes",JSON.stringify(sizes));
        formData.append("style" , style)
        formData.append("colour", colour)
        
        image1 && formData.append("image1",image1);
        image2 && formData.append("image2",image2);
        image3 && formData.append("image3",image3);
        image4 && formData.append("image4",image4);

        const response = await fetch(`${backendUrl}/product/add`, {
          method: 'POST',
          body: formData,
          credentials: 'include',
        })

        const data = await response.json();
        if(data == "Product Added"){
          toast.success(data);
          setName('');
          setDescription('');
          setPrice('');
          setSizes([]);
          setCategory('Men');
          setBestseller(false);
          setStyle('');
          setColour('')
          setImage1(false);
          setImage2(false);
          setImage3(false);
          setImage4(false);
        }
    }
    catch(err){
      console.log(err);
      toast.error(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='w-full flex flex-col items-start gap-3'>
        <div>
          <p className='mb-2'>Upload Images</p>

          <div className='flex gap-3'>
            <label htmlFor='image1'>
              <img className="w-20 hover:cursor-pointer" src={!image1?assets.upload_area:URL.createObjectURL(image1)}></img>
              <input onChange={(e) => setImage1(e.target.files[0])} type='file' id='image1' hidden/>
            </label>
            <label htmlFor='image2'>
              <img className="w-20 hover:cursor-pointer" src={!image2?assets.upload_area:URL.createObjectURL(image2)}></img>
              <input onChange={(e) => setImage2(e.target.files[0])} type='file' id='image2' hidden/>
            </label>
            <label htmlFor='image3'>
              <img className="w-20 hover:cursor-pointer" src={!image3?assets.upload_area:URL.createObjectURL(image3)}></img> 
              <input onChange={(e) => setImage3(e.target.files[0])} type='file' id='image3' hidden/>
            </label>
            <label htmlFor='image4'>
              <img className="w-20 hover:cursor-pointer" src={!image4?assets.upload_area:URL.createObjectURL(image4)}></img>
              <input onChange={(e) => setImage4(e.target.files[0])} type='file' id='image4' hidden/>
            </label>
          </div>
        </div>
        <div className='w-full'>
          <p className='mb-2'>Product Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Type here' className='max-w-[500px] w-full px-3 py-2 border-' required/>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} type='text' placeholder='Type Description here' className='max-w-[500px] w-full px-3 py-2 border-' required/>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

          <div>
          <p className='mb-2'>Product Style</p>
          <input onChange={(e) => setStyle(e.target.value)} value={style} type='text' placeholder='Type here' className='max-w-[500px] w-full px-3 py-2 border-' required/>
          </div>
          <div>
          <p className='mb-2'>Product Colour</p>
          <input onChange={(e) => setColour(e.target.value)} value={colour} type='text' placeholder='Type here' className='max-w-[500px] w-full px-3 py-2 border-' required/>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

          <div>
            <p className='mb-2'>Product Category</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
              <option value={'Men'}>Men</option>
              <option value={'Women'}>Women</option>
              <option value={'Kids'}>Kids</option>
            </select>
          </div>
          <div>
            <p className='mb-2'>Product Price</p>
            <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2' type='Number' placeholder='Ex.25' />
          </div>
        </div>

        <div >
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-3'>
            <div onClick={() =>setSizes(prev=> prev.includes("1")? prev.filter(item => item !== "1"): [...prev,"1"])}>
              <p className={`${sizes.includes("1")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>1</p>
            </div>

            <div onClick={() =>setSizes(prev=> prev.includes("2")? prev.filter(item => item !== "2"): [...prev,"2"])}>
              <p className={`${sizes.includes("2")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>2</p>
              </div>

            <div onClick={() =>setSizes(prev=> prev.includes("3")? prev.filter(item => item !== "3"): [...prev,"3"])}>
              <p className={`${sizes.includes("3")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>3</p>
              </div>

            <div onClick={() =>setSizes(prev=> prev.includes("4")? prev.filter(item => item !== "4"): [...prev,"4"])}>
              <p className={`${sizes.includes("4")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>4</p>
              </div>

            <div onClick={() =>setSizes(prev=> prev.includes("5")? prev.filter(item => item !== "5"): [...prev,"5"])}>
              <p className={`${sizes.includes("5")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>5</p>
              </div>

            <div onClick={() =>setSizes(prev=> prev.includes("6")? prev.filter(item => item !== "6"): [...prev,"6"])}>
              <p className={`${sizes.includes("6")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>6</p>
              </div>

            <div onClick={() =>setSizes(prev=> prev.includes("7")? prev.filter(item => item !== "7"): [...prev,"7"])}>
              <p className={`${sizes.includes("7")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>7</p>
              </div>

            <div onClick={() =>setSizes(prev=> prev.includes("8")? prev.filter(item => item !== "8"): [...prev,"8"])}>
              <p className={`${sizes.includes("8")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>8</p>
              </div>

            <div onClick={() =>setSizes(prev=> prev.includes("9")? prev.filter(item => item !== "9"): [...prev,"9"])}>
              <p className={`${sizes.includes("9")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>9</p>
              </div>

            <div onClick={() =>setSizes(prev=> prev.includes("10")? prev.filter(item => item !== "10"): [...prev,"10"])}>
              <p className={`${sizes.includes("10")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>10</p>
              </div>

            <div onClick={() =>setSizes(prev=> prev.includes("11")? prev.filter(item => item !== "11"): [...prev,"11"])}>
              <p className={`${sizes.includes("11")? "bg-pink-100 border-1":"bg-slate-200"} px-3 py-1 cursor-pointer`}>11</p>
              </div>

          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller}  type='checkbox' id='bestseller' />
          <label className=' cursor-pointer' htmlFor='bestseller'>Add To BestSeller</label>
        </div>

        <button type='Submit' className='w-28 py-3 mt-4 bg-black text-white hover:bg-gray-800 focus:outline-none'>Add</button>
      </form>
    </div>
  )
}
