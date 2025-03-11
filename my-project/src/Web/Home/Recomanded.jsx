import { useState,useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useCartStore from "../Store";
export const Recomanded = ()=>{
  
  const updateCart = useCartStore((state) => state.updateCart);
  const [products , setProducts] = useState([])
  const navigate = useNavigate();
  const Product_data = async () => {
    const res = await axios.get("http://localhost:4000/read-product");
    setProducts(res.data.slice(0, 8));
  };
useEffect(()=>{
    Product_data();
  },[])
  const getId = async( id)=>{
    const email = localStorage.getItem("userEmail");
    const quantity = 1;
    if(email != null){
    const a = await axios.post('http://localhost:4000/cartitems',{email:email,productid:id,quantity:quantity})
    updateCart();
      if(a.data.message){
      const Toast = Swal.mixin({
        toast: true, position: "top-end", timer: 2000, timerProgressBar: true,showConfirmButton: false,
      });
      Toast.fire({
        icon: "success", title: `${a.data.message}`
      });
      }
    } else {
      navigate('/signin')
    }
  }

return(<>
<div className="max-w-[1390px] mx-auto px-4 py-8">
    <div className='mb-7'>
      <h3 className='text-3xl text-emerald'>Recomanded Products </h3>      
    </div>

<div className="overflow-hidden" >
        <div className="grid md:grid-cols-4 grid-cols-2  ">
          {products.map(( values,index) => (
            <div key={index} className="px-1 py-2" >
                <div className="relative max-w-xs bg-white border rounded-lg shadow-sm p-4  hover:border-emerald hover:shadow-md ">

                    <Link to={`/product/${values._id}`} className="flex justify-center mb-4">
                        <img src={values.image} alt={values.name} className="w-40 h-40 object-contain" />
                    </Link>

                    <div className="relative">
                        <span className="text-lg font-semibold">{values.keywords} </span>
                        <span className="text-gray-600 text-sm pl-4 absolute right-0 top-1">${values.price}</span>
                        <p className="text-sm text-gray-500 mt-2"> {values.title}</p>
                        <div className=" mt-2 ">
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 " /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 " /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 " /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 " /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 " /> 
                            
                        <span className="ml-2 text-sm text-gray-500">(121)</span>
                        </div>
                        <button onClick={()=>getId(values._id)}
                        className="mt-4  border-2 border-emerald hover:text-lightyellow duration-100 p-2   rounded-2xl hover:bg-emerald">
                        Add to Cart
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>

</div>
</>)

}
export default Recomanded;