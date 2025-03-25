import { useFormik } from "formik";
import Footer from "../Footer";
import Header from "../Header";
import * as Yup from "yup";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useMask } from "@react-input/mask";
import useCartStore from "../Store";
export const Checkout = ()=>{
  const navigate = useNavigate();
  const [fetchData,setFetchData] = useState([]);
  const [currentDate , setCurrentDate] = useState();
  const [currentTime , setCurrentTime] = useState();
  const cartRemove = useCartStore((state) => state.cartRemove);
  const updateCart = useCartStore((state) => state.updateCart);

  const cartProducts = async()=>{
    const email = localStorage.getItem("userEmail");
    const alpha = await axios.post(`http://localhost:4000/cart-product`,{email:email})
    setFetchData(alpha.data);
  }
  useEffect(()=>{
    cartProducts();
  },[cartRemove])

  
  const storageEmail = localStorage.getItem('userEmail');
  const storageFirstName = localStorage.getItem('userFirstname');
  const StoageLastName = localStorage.getItem('userLastname');
  const storagePhone = localStorage.getItem('userPhone')

useEffect(()=>{
  const today = new Date();
  const formetedDate = today.toISOString().split("T")[0];
  const formattedTime = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
  setCurrentDate(formetedDate);
  setCurrentTime(formattedTime);
  document.title = "Check Out"
},[])

  let a = 0;
  fetchData.map((item)=>{
    a += item.quantity * item.productDetails.price ;
  })
  const status = "pending";
const formik = useFormik({
    initialValues:{
        firstName:storageFirstName,
        lastName:StoageLastName,
        email:storageEmail,
        phone:storagePhone,
        address:"",
        postcode:"",
        city:"",
    },
    validationSchema:Yup.object({
        firstName:Yup.string().required("please enter your name here"),
        lastName:Yup.string().required("enter your last name here"),
        email:Yup.string().email().required("Email is required"),
        phone:Yup.string().required("Enter your phone ").min(15,"eneter your valid number here"),
        address:Yup.string().required("Enter your address here"),
        postcode:Yup.string().required("enter your postcode here"),
        city:Yup.string().required("enter your city name here ")
    }),
    enableReinitialize:true,
    onSubmit: async(values)=>{
      const formData = new FormData();
      formData.append("firstName",values.firstName);
      formData.append("lastName",values.lastName);
      formData.append("email",values.email);
      formData.append("phone",values.phone);
      formData.append("address",values.address);
      formData.append("postcode",values.postcode);
      formData.append("city",values.city);
      formData.append("currentDate",currentDate);
      formData.append("currentTime",currentTime);
      formData.append("status",status);
      formData.append("amount",a)
      fetchData.forEach((product) => formData.append("productId", product.productDetails._id));
      fetchData.forEach((product) => formData.append("productQty", product.quantity));
      const alpha = await axios.post("http://localhost:4000/finalorder",formData);
      if(alpha.data.abc){
        updateCart();  
        navigate('/'); 
        Swal.fire({
          text: `${alpha.data.abc}`,
          icon: "success"
        });
        await axios.post('http://localhost:4000/empty-cart',{email:storageEmail});
      }
    }
})
  const useRef = useMask({
    mask: '+92 ___ _______',
    replacement: { _: /\d/ },
  })
return(<>
<Header/>
<div className="relative mx-auto    bg-slate-200 "  >
    <div className="bg-[url('../../../public/page-header-bg.jpg')]  w-full  h-[150px] flex items-center justify-center">
        <div className=" text-center ">
            <h3 className="md:text-5xl text-2xl font-thin ">Checkout </h3>
            <p className="md:text-xl text-md text-emerald ">Shop</p>
        </div>
    </div>
</div>
<div className='my-4  ' >
    <p className='text-gray-400 max-w-7xl mx-auto' > <span className='hover:text-black cursor-pointer' onClick={()=>{navigate('/')}}>Home </span> &nbsp; &gt; &nbsp;
    <span className='hover:text-black cursor-pointer' onClick={()=>{navigate('/viewcart')}} >View Cart</span> &nbsp; &gt; &nbsp; <span className='hover:text-black cursor-pointer'  >Check Out</span></p>
</div> <hr />
<div className="max-w-6xl mx-auto p-4 font-sans">
<form  onSubmit={formik.handleSubmit}>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-medium mb-6 text-gray-800">Shipping Address</h2>
          
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="mb-2 text-gray-500"> First Name <span className="text-emerald ">*</span></p>
                <input type="text" id="firstName" name="firstName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald"/>
              {formik.touched.firstName &&  formik.errors.firstName && (
            <span className="text-rose-500" >{formik.errors.firstName}</span>
          )}
              </div>
              <div>
              <p className="mb-2 text-gray-500"> Last Name <span className="text-emerald">*</span></p>
                <input type="text" id="lastName" name="lastName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald    " />
              {formik.touched.lastName &&  formik.errors.lastName && (
                <span className="text-rose-500" >{formik.errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
              <p className="mb-2 text-gray-500"> Email Address <span className="text-emerald">*</span></p>
                <input type="email" id="email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald  "/>
              {formik.touched.email &&  formik.errors.email && (
            <span className="text-rose-500" >{formik.errors.email}</span>
          )}
              </div>
              <div>
              <p className="mb-2 text-gray-500"> Phone <span className="text-emerald">*</span></p>
                <input type="tel" ref={useRef} id="phone" name="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald    "/>
              {formik.touched.phone &&  formik.errors.phone && (
            <span className="text-rose-500" >{formik.errors.phone}</span>
          )}
              </div>
            </div>

            <div>
            <p className="mb-2 text-gray-500"> Address <span className="text-emerald">*</span></p>
              <textarea id="address" rows="4" name="address" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald "></textarea>
            {formik.touched.address &&  formik.errors.address && (
            <span className="text-rose-500" >{formik.errors.address}</span>
          )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
              <p className="mb-2 text-gray-500"> Postcode<span className="text-emerald">*</span></p>
                <input type="text" id="postcode" name="postcode" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.postcode}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald   "/>
              {formik.touched.postcode &&  formik.errors.postcode && (
            <span className="text-rose-500" >{formik.errors.postcode}</span>
          )}
              </div>
              <div>
              <p className="mb-2 text-gray-500"> City <span className="text-emerald">*</span></p>
                <input type="text" id="city" name="city" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald"/>
              {formik.touched.city &&  formik.errors.city && (
            <span className="text-rose-500" >{formik.errors.city}</span>
          )}
              </div>
            </div>
        </div>

        <div className="lg:w-1/3">
          <div className="border border-gray-200 rounded p-6">
            <h2 className="text-xl font-medium mb-6 text-gray-800">Your Order</h2>
            
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="grid grid-cols-[60%_auto] mb-2 text-center">
                <span className="font-medium text-gray-800 text-justify">Product</span>
                <span className="font-medium text-gray-800 space-x-2">
                  <span>Quantity</span>
                  <span>Total</span>
                </span>
              </div>
              {fetchData.map((item)=>(
              <div className="grid grid-cols-[60%_auto] py-1" key={item._id}>
                  <p className="text-gray-500">{item.productDetails.title}</p>
                <span className=" text-emerald grid grid-cols-2 text-center ">
                  <span>{item.quantity}</span>
                  <span>{item.productDetails.price}</span>
                </span>
              </div>
              ))}
            </div>
            
            <div className="border-b border-gray-200 pb-2">
              <div className="flex justify-between py-1">
                <span className="text-gray-800">Subtotal:</span>
                <span className="text-gray-800">{a}</span>
              </div>
            </div>
            
            <div className="border-b border-gray-200 py-2">
              <div className="flex justify-between py-1">
                <span className="text-gray-800">Shipping:</span>
                <span className="text-gray-800">200</span>
              </div>
            </div>
            
            <div className="py-2 mb-2">
              <div className="flex justify-between py-1">
                <span className="text-gray-800 font-medium">Total:</span>
                <span className="text-emerald font-medium">{a + 200}</span>
              </div>
            </div>
            <button type="submit" className="w-full bg-white border border-emerald text-emerald py-3 rounded hover:bg-emerald hover:text-white transition-colors">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
    </div>
<Footer/>
</>)

}
export default Checkout;