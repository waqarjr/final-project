import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMinus, faPlus, faRotateLeft, faStar, faTruck} from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';
import Footer from '../Footer';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Product = ()=>{
const {id} = useParams();
const [title , setTitle] = useState();
const [keywords, setKeywords] = useState();
const [price, setPrice] = useState();
const [long_description,setLong_Description] = useState();
const [image , setImage] = useState();
const [mulImage, setMulImage] = useState([]);
const [toggle , setToogle ]= useState(false);

useEffect(()=>{
fetchData(id);
fetchMultiple(id);
},[id])

const fetchData = async(id)=>{
  const data = await axios.get(`http://localhost:4000/read-update-product/${id}`)
  setTitle(data.data.title);
  setKeywords(data.data.keywords);
  setPrice(data.data.price);
  setLong_Description(data.data.long_description);
  setImage(data.data.image);
}
const fetchMultiple = async(id)=>{
  const response = await axios.get(`http://localhost:4000/read-mul-image-product/${id}`);
  setMulImage(response.data)
}

return(<>

<Header/>
<div className='my-8 max-w-7xl mx-auto' >
        <p className='text-gray-400' > <span className='hover:text-black cursor-pointer'>Home </span> &nbsp; &gt; &nbsp;<span className='hover:text-black cursor-pointer'  >Product</span> </p>
    </div>
<div className="min-h-screen bg-white p-6 md:p-12">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 lg:grid-cols-2  ">   
          <div className="space-y-4  ">
            <div className="relative  overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center ">
              <img src={image} className=" w-[400px] object-contain p-4"/>
            </div>
            <div className="grid grid-cols-4 gap-4 ">
                  {mulImage.map((value,index)=>(
                <button key={index} className="relative   overflow-hidden rounded-lg border border-black bg-gray-100 hover:border-gray-900">
                  <img src={value.images} className="h-full w-full object-contain  " />
                </button>
                  ))}
            </div>
          </div>

          <div className="space-y-8 ">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">{keywords}</h1>
              <p className="text-gray-500">
                {title}
              </p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i}  icon={faStar} className="fa-solid fa-star text-lg text-emerald " />
                ))}
                <span className="ml-2 text-sm text-gray-500">(121)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-gray-900">${price}</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center rounded-md border border-black">
                <button className="px-3 py-2 hover:bg-gray-100">
                  <FontAwesomeIcon icon={faMinus} className='text-sm' />
                </button>
                <span className="w-12 text-center">1</span>
                <button className="px-3 py-2 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faPlus} className='text-sm' />
                </button>
              </div>
              <span className="text-sm text-orange-500">Only 7 items Left!</span>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 rounded-full bg-emerald px-4 py-3 text-white hover:bg-[#3ac6a1] transition-colors">
                Buy Now
              </button>
              <button className="flex-1 rounded-full border border-black px-4 py-3 text-gray-900 hover:border-gray-100 hover:bg-gray-100 transition-colors">
                Add to Cart
              </button>
            </div>

            <div className="space-y-4 rounded-lg border border-black p-4 ">
              <div className="flex items-center space-x-4  ">
                <FontAwesomeIcon icon={faTruck} />
                <div>
                  <p className="font-medium text-gray-900  ">Free Delivery</p>
                  <p className="text-sm text-gray-500">Enter your Postal code for Delivery Availability</p>
                </div>
              </div><hr className='border-black ' />
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faRotateLeft} />
                <div>
                  <p className="font-medium text-gray-900">Return Delivery</p>
                  <p className="text-sm text-gray-500">
                    Free 30 Days Delivery Returns. <span className="cursor-pointer underline">Details</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> <hr />
    <div className='my-10  ' >
      <div className='text-center my-5 ' >
           <span className='p-4 hover:text-emerald  hover:border-b hover:border-emerald transition-colors duration-100 cursor-pointer' onClick={()=>{setToogle(true)}}>Long Description</span> |     
           <span className='p-4 hover:text-emerald  hover:border-b hover:border-emerald transition-colors duration-100 cursor-pointer' onClick={()=>{setToogle(false)}} > Reviews</span>     
      </div>
      <div className={`${toggle ? "hidden": ""} my-8 max-w-7xl mx-auto border-2 rounded border-gray-200 `} >

        <div className='m-3'>
          {long_description}
        </div>
      </div>
      <div  className={`${toggle ? "": "hidden"}`} >
        <h2> 2 </h2>
      </div>
    </div>            
<Footer/>
</>)

}
export default Product;