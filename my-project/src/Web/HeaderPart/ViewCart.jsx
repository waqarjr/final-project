import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Footer";
import Header from "../Header";
import { faClose, faRefresh,faPlus,faMinus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState , useEffect} from "react";
import axios from "axios";
import useCartStore from "../Store";
import Swal from 'sweetalert2';
export const ViewCart = ()=>{

  const navigate = useNavigate();
    const [fetchData ,setFetchData] = useState([]);
    const updateCart = useCartStore((state)=> state.updateCart);
    const cartRemove = useCartStore((state) => state.cartRemove);
    const [change ,setChange] = useState();
    const cartProducts = async()=>{
      const email = localStorage.getItem("userEmail");
      const alpha = await axios.post(`http://localhost:4000/cart-product`,{email:email})
      setFetchData(alpha.data);
    }
    useEffect(()=>{
      cartProducts();
    },[change,cartRemove])
    let a = 0;
    fetchData.map((item)=>{
      a += item.quantity * item.productDetails.price ;
    })

    const quantityValue = async(id,count)=>{
      const email = localStorage.getItem("userEmail");
    if(email != null){
      const a = await axios.post('http://localhost:4000/chnagequantity',{email:email,id:id,quantity:count});
      updateCart();
      setChange(count);
      if(a.data.message){
        const Toast = Swal.mixin({
          toast: true, position: "top-end", timer: 2000, timerProgressBar: true,showConfirmButton: false,
        });
        Toast.fire({
          icon: "success", title: `${a.data.message}`
        });
      }
    } 
    }

const delCart = async(id)=>{
  const alpha = await axios.post(`http://localhost:4000/del-cart/${id}`);
  if(alpha.data.a){
    setFetchData((prevData) => prevData.filter((data) => data._id !== id));
    updateCart();
  }
}   
return(<>
<Header/>



<div className="relative mx-auto    bg-slate-200 "  >
    <div className="bg-[url('../../../public/page-header-bg.jpg')]  w-full  h-[150px] flex items-center justify-center">
        <div className=" text-center ">
            <h3 className="md:text-5xl text-2xl font-thin ">Shopping Cart </h3>
            <p className="md:text-xl text-md text-emerald ">Shop</p>
        </div>
    </div>
</div>
<div className='my-4  ' >
    <p className='text-gray-400 max-w-7xl mx-auto' > <span className='hover:text-black cursor-pointer' onClick={()=>{navigate('/')}}>Home </span> &nbsp; &gt; &nbsp;<span className='hover:text-black cursor-pointer'  >View Cart</span> </p>
</div> <hr />
<div className="max-w-7xl mx-auto p-4 font-sans">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 text-gray-500 font-normal">Product</th>
                <th className="text-left py-4 text-gray-500 font-normal">Price</th>
                <th className="text-left py-4 text-gray-500 font-normal">Quantity</th>
                <th className="text-left py-4 text-gray-500 font-normal">Total</th>
                <th className="py-4"></th>
              </tr>
            </thead>
            <tbody>
              {fetchData.map(item =>(
              <tr className="border-b border-gray-200" key={item._id}>
                <td className="py-2" width={450}>
                  <div className="flex items-center">
                    <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center mr-4">
                      <img src={item.productDetails.image} alt={item.productDetails.title}  className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="font-medium">{item.productDetails.title}</div>
                  </div>
                </td>
                <td className="py-2 text-gray-800">{item.productDetails.price}</td>
                <td className="py-2 " >
                <div className="w-24 flex items-center rounded-md border border-emerald">
                <input type="number" min="1" defaultValue={item.quantity} onChange={(e)=>{const newValue = e.target.value; quantityValue(item._id, newValue);}} 
                className="w-full p-2 border border-gray-300 rounded text-center" />                  
                </div>
                </td>
                <td className="py-2 text-emerald font-medium">{ item.quantity * item.productDetails.price}</td>
                <td className="py-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <FontAwesomeIcon icon={faClose}  onClick={()=>{delCart(item._id)}} />
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:w-1/3">
          <div className="border border-gray-200 rounded p-6">
            <h2 className="text-xl font-medium mb-6">Cart Total</h2>
            <div className="border-b border-gray-200 pb-2">
              <div className="flex justify-between mb-4">
                <span className="text-gray-800">Subtotal:</span>
                <span className="text-gray-800 font-medium">{a}</span>
              </div>
            </div>
            <div className="py-2">
              <div className="text-gray-800 mb-2">Shipping:</div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Shipping Fee</span>
                <span className="text-gray-800">200</span>
              </div>
            </div>
            <div className="border-t border-gray-200 py-4">
              <div className="flex justify-between">
                <span className="text-gray-800">Total:</span>
                <span className="text-emerald font-medium">{a + 200}</span>
              </div>
            </div>
            <button onClick={()=>navigate('/checkout')} className="w-full bg-white border border-emerald text-emerald py-3 rounded hover:bg-emerald hover:text-white duration-200 transition-colors">
              Proceed To Checkout
            </button>
          </div>

          <div className="mt-4">
            <button onClick={()=>{navigate('/')}} className="w-full bg-white border border-emerald text-emerald py-3 rounded flex items-center justify-center">
              Continue Shopping &nbsp; <FontAwesomeIcon icon={faRefresh} />
            </button>
          </div>
        </div>
      </div>
    </div>
<Footer/>
</>)
}
export default ViewCart;