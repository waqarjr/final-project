import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMagnifyingGlass ,  faPhone,faBars, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import useCartStore from "./Store";
import axios from "axios";

export const Header = ()=>{
   const [isHovered, setIsHovered] = useState(false);
  const [toogle , setToogle] = useState(false);
   const [fetchData , setFetchData] = useState([]);
   const cartUpdated = useCartStore((state) => state.cartUpdated);
   const removeCart = useCartStore((state)=> state.removeCart);
  
  const sign =  localStorage.getItem("isSigup");
  
  const cartProducts = async()=>{
    const email = localStorage.getItem("userEmail");
    const alpha = await axios.post(`http://localhost:4000/cart-product`,{email:email})
    setFetchData(alpha.data);
  }
  useEffect(()=>{
    cartProducts();
  },[cartUpdated])

let a = 0;
fetchData.map((item)=>{
  a += item.quantity * item.productDetails.price
})

  const delCart = async(id)=>{
  const alpha = await axios.post(`http://localhost:4000/del-cart/${id}`);
  if(alpha.data.a){
    removeCart();
    setFetchData((prevData) => prevData.filter((data) => data._id !== id));
  }
}

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

return(<>

<div className="bg-emerald text-white py-3 px-8 ">
   <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto flex items-center justify-between text-md">    
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="h-5 w-4 mr-2" />
          <span>+92 315 6417097</span>
        </div>

      <div className="flex items-center space-x-4">
         <div className="relative">
            <button className="flex items-center space-x-1 hover:opacity-80">
              { sign ? (<>
              <FontAwesomeIcon icon={faUser} className="h-4 w-3" />
              <Link to="/account" className="text-sm" >Account</Link>
              </>):(
              <Link to="/signin" className=" text-sm hover:border-b-2 border-white" >sign in/sign up</Link>
              )}
            </button>

         </div>
      </div>
   </div>
</div>

   
<nav className="border-b bg-lightyellow">
   <div className="w-full px-2  sm:px-8 lg:px-20">
      <div className="flex items-center justify-between h-[90px]">
         <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="../../public/waqarjr.png" alt="logo" className="w-[150px]" />
            </Link>
         </div>

         <div className="hidden lg:flex items-center space-x-8 md:px-4">
            <div className="relative">
               <Link to="/" className="flex items-center text-emerald hover:text-gray-900 focus:outline-none">
                  Home
               </Link>
            </div>
            <Link to="/shop" className="text-emerald hover:text-gray-900">
              Shop
            </Link>
            <Link to="/aboutus" className="text-emerald hover:text-gray-900">
              About Us
            </Link>
            <Link to="/contact" className="text-emerald hover:text-gray-900">
              Contact Us
            </Link>
         </div>

         <div className="sm:flex flex-1 md:w-full lg:max-w-md px-4 ">
            <div className="relative md:w-full max-w-sm md:mx-0 mx-auto">
               <FontAwesomeIcon icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
               <input type="search" placeholder="Search Product"
                className="w-full pl-10 pr-2  sm:pr-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"/>
            </div>
         </div>

         <div className="flex items-center space-x-2  md:space-x-4">
         <div className="relative">
      <div className="cursor-pointer"
        onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={()=>{setToogle(!toogle)}} >
        <div className=" space-x-1 ">
          <FontAwesomeIcon icon={faCartShopping}  className="text-emerald"  />
          <span className="absolute left-2 -top-1 px-1  text-emerald text-xs font-bold rounded-full  bg-white ">
            { sign ? fetchData.length :""}
          </span>
        </div>
      </div>
      {sign ? (<>
      <div className={`absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 transition-all duration-300 
         ${isHovered || toogle ? ' opacity-100' : 'opacity-0 '}   `} >
        <div className="p-4">
          <h3 className="text-lg font-medium  mb-3 text-center text-emerald">Cart Items</h3>
          <div className="space-y-3">
            {fetchData.map(item => (
              <div key={item._id} className="flex items-start border-b pb-3">
                <img src={item.productDetails.image} alt={item.productDetails.title} className="w-12 h-12 object-cover mr-3" />
                <div className="">
                  <h4 className="text-sm font-medium text-gray-800 mb-1">{item.productDetails.title}</h4>
                  <div className="text-sm text-gray-600">
                   {item.quantity} * {item.productDetails.price} = { item.quantity * item.productDetails.price}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600" onClick={()=>delCart(item._id)}>
                <span>&times;</span>
                </button>
              </div>
            ))}
          </div>  
          
          <div className="">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-gray-700">TOTAL</span>
              <span className="font-medium text-gray-800">{a}</span>
            </div>
            <div className="flex space-x-2">
              <Link to="/viewcart" className="bg-emerald text-white hover:bg-white border hover:text-emerald border-emerald duration-200 px-4 py-2 rounded w-1/2 text-sm font-medium ">
                View Cart
              </Link>
              <Link to='/checkout' className="bg-emerald text-white hover:bg-white border hover:text-emerald border-emerald duration-200 px-4 py-2 rounded w-1/2 text-sm font-medium flex items-center justify-center transition-colors">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
      </>):""}
     
    </div>

            <div className="lg:hidden flex items-center">
               <button className="mobile-menu-button p-2 sm:p-4 " onClick={()=>{setIsMobileMenuOpen(!isMobileMenuOpen)}} > 
                  <FontAwesomeIcon  icon={faBars} className="h-5 w-5  text-emerald "/>
               </button>
            </div>     
         </div>
      </div>
         <div id="mobile-menu" 
         className={`lg:hidden w-full overflow-hidden transition-all duration-300 ease-in-out text-center
            ${isMobileMenuOpen  ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} bg-lightyellow`} >
            <Link to="/" className="text-gray-800 font-semibold hover:border-b-2 mb-1 py-2 border-indigo-500">Home</Link><br/>
            <Link to="/shop" className="text-gray-800 font-semibold hover:border-b-2 py-2 border-indigo-500">Shop</Link>
            <Link href="/account" className="block   py-2 text-gray-800 font-semibold hover:bg-blue-200">Account</Link>
            <Link to="/contact" className="text-gray-800 font-semibold hover:border-b-2 py-2 border-indigo-500">Contact Us</Link>   
         </div>
   </div>
</nav>
   

</>)
}
 export default Header;