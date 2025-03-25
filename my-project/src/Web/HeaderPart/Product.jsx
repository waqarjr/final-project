import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMinus, faPlus, faRotateLeft, faStar, faTruck} from '@fortawesome/free-solid-svg-icons';
import Header from '../Header';
import Footer from '../Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Swal from 'sweetalert2';
import useCartStore from '../Store';  
export const Product = ()=>{

const updateCart = useCartStore((state)=> state.updateCart);
const {id} = useParams();
const [title , setTitle] = useState();
const [keywords, setKeywords] = useState();
const [price, setPrice] = useState();
const [long_description,setLong_Description] = useState();
const [image , setImage] = useState();
const [mulImage, setMulImage] = useState([]);
const [toggle , setToogle ]= useState(false);
const [rating, setRating] = useState(0);
const [eror , setEror] = useState('');
const [currentDate , setCurrentDate] = useState();
const [currentTime , setCurrentTime] = useState();
const [firstName , setFirstName] = useState();
const [lastName , setLastName] = useState();
const [allReviews,setAllReviews] = useState([]);
const [count , setCount] = useState(1);
const navigate = useNavigate();

useEffect(()=>{
  const today = new Date();
  const formetedDate = today.toISOString().split("T")[0];
  const formattedTime = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  setCurrentDate(formetedDate);
  setCurrentTime(formattedTime);
  document.title = "Creat Categories";
  const usertFistName = localStorage.getItem("userFirstname");
  const userLastname = localStorage.getItem("userLastname");
  setFirstName(usertFistName);
  setLastName(userLastname);
},[])

useEffect(()=>{
fetchData(id);
fetchMultiple(id);
fetchReviews(id);
document.title = "Product";
},[id])
const fetchReviews = async(id)=>{
  const data = await axios.get(`http://localhost:4000/getreviews/${id}`);
  setAllReviews(data.data);
}
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

const formik = useFormik({
  initialValues:{
    reviews:'',
  },
  validationSchema: Yup.object({
    reviews:Yup.string().required("please write ur idea about this product").min(10,"text must be longer then 10 digits"),
  }),
  onSubmit: async(values,{resetForm})=>{
    if(rating == 0){
      setEror("please select this");
    } else  {
      const formData = new FormData();
      formData.append("reviews",values.reviews);
      formData.append("rating",rating);
      formData.append("currentDate",currentDate);
      formData.append("currentTime",currentTime);
      formData.append("productId",id);
      formData.append("firstName",firstName);
      formData.append("lastName",lastName);
      const alpha =  await axios.post("http://localhost:4000/reviews",formData)
      if(alpha.data.mess){
        Swal.fire({
          text: `${alpha.data.mess}`,
          icon: "success"
        });
      }
      resetForm();
    }
  }
})

const toCart = async ()=>{
  const email = localStorage.getItem("userEmail");
  if(email != null){
  const a =  await axios.post('http://localhost:4000/cartitems',{email:email,productid:id,quantity:count})
    updateCart();
      if(a.data.message){
      const Toast = Swal.mixin({
        toast: true, position: "top-end", timer: 2000,timerProgressBar: true,showConfirmButton: false,
      });
      Toast.fire({
        icon: "success",title: `${a.data.message}`
      });
      }
  } else {
    navigate('/signin')
  }
} 

return(<>

<Header/>
<div className='my-8 max-w-7xl mx-auto' >
        <p className='text-gray-400' > <span className='hover:text-black cursor-pointer' onClick={()=>{navigate('/')}}>Home </span> &nbsp; &gt; &nbsp;<span className='hover:text-black cursor-pointer'  >Product</span> </p>
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
                <button key={index} className="relative overflow-hidden rounded-lg border border-gray-300 bg-gray-100">
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
                <FontAwesomeIcon key={i}  icon={faStar} className="text-lg text-emerald " />
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
              <div className="flex items-center rounded-md border border-emerald">
                <button className="px-3 py-2 rounded-l-md hover:bg-gray-100" onClick={()=> count <= 1 ? "" : setCount(count - 1)}>
                  <FontAwesomeIcon icon={faMinus} className='text-sm'  />
                </button>
                <span className="w-12 text-center">{count}</span>
                <button className="px-3 py-2  rounded-r-md hover:bg-gray-200" onClick={()=>setCount(count + 1)}>
                    <FontAwesomeIcon icon={faPlus} className='text-sm'  />
                </button>
              </div>
              <span className="text-sm text-orange-500">Only 7 items Left!</span>
            </div>

            <div className="flex space-x-4">
              <button onClick={toCart} className="flex-1 rounded-full bg-emerald px-4 py-3 text-white hover:bg-[#3ac6a1] transition-colors ">
                Add to a Cart
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
      <div className='text-center my-[11px] ' >
           <span className={`p-3 hover:text-emerald  hover:border-b-2 hover:border-emerald transition-colors duration-100 cursor-pointer ${toggle ? "":"text-emerald border-emerald border-b-2"}`}
           onClick={()=>{setToogle(false)}}>Long Description</span> |     
           <span className={`p-3 hover:text-emerald  hover:border-b-2 hover:border-emerald transition-colors duration-100 cursor-pointer ${toggle ? "text-emerald border-emerald border-b-2":""}`}
            onClick={()=>{setToogle(true)}} > Reviews ( {allReviews.length} ) </span>     
      </div>
      <div className={`${toggle ? "hidden": ""}  max-w-7xl mx-auto border-2 rounded border-gray-200 `} >

        <div className='m-3' dangerouslySetInnerHTML={{ __html: long_description }}>
        </div>
      </div>
      <div  className={`${toggle ? "": "hidden"}  max-w-7xl mx-auto border-2 rounded border-gray-200`} >
      <div className='m-3'>
          <span>Reviews ( {allReviews.length} ) </span>
          <div className='grid grid-cols-[60%_auto]' >
                <div>
                {allReviews.map((value,index)=>(
                  <div className='grid grid-cols-[22%_auto]' key={index} >
                    <div className='border-r border-emerald p-2 [&_*]:py-1   inline-block '>
                      <p className='text-gray-400' >{value.firstName} {value.lastName} </p>
                      {[...Array(value.rating)].map((_, i) => (
                      <FontAwesomeIcon key={i}  icon={faStar} className="text-lg text-yellow-400  " />
                      ))}
                      < p className='text-gray-400'>{value.currentDate}</p>
                      <p className='text-gray-400' >{value.currentTime}</p>
                    </div>
                    <div className='p-2 text-gray-500 '>
                      <p>{value.reviews}</p>
                    </div>
                  </div>
                 ))} 
                </div>
                <Link to="/signin" className={`flex justify-center text-emerald ${localStorage.getItem('isSigup') ? 'hidden':''}`}>Sing in / Sign up</Link>
                <div className={`mx-auto ${localStorage.getItem('isSigup') ? '':'hidden'} `}>
                  <form onSubmit={formik.handleSubmit}>
                  <div className="flex flex-col ">
                  <p className='text-center py-2 text-xl font-medium text-emerald'>Add a review</p>
                  <div className="flex flex-col items-center justify-center  pb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, index) => {
                        const starNumber = index + 1;
                        return (
                          <button key={index}  onClick={() => setRating(starNumber)}    
                          className="focus:outline-none" type="button">
                            <FontAwesomeIcon  icon={faStar} className={`fa fa-star text-3xl transition-colors duration-200 ${
                                starNumber <= rating ? 'text-yellow-400': 'text-gray-300 hover:text-yellow-300'}`} />
                          </button>
                        );
                      })}
                    </div> <span className='text-red-500' >{eror}</span>
                  </div>
                <textarea name="reviews" id="reviews" cols={40} rows={4} value={formik.values.reviews} onBlur={formik.handleBlur} onChange={formik.handleChange}
                className="bg-gray-50 border border-emerald focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2 " ></textarea>
                {formik.touched.reviews && formik.errors.reviews &&(
                  <span className='text-red-500' >{formik.errors.reviews}</span>
                )}<br />
                </div>
                <button type="submit"   className=" rounded-sm px-4 py-2 hover:bg-emerald text-emerald hover:text-white  border-emerald border-2 " > Submit </button>
                  </form>
              </div>
          </div>
          
        </div>
      </div>
    </div>            
<Footer/>
</>)

}
export default Product;