import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faChevronDown, faMagnifyingGlass ,  faPhone,faLocationDot, faBars } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom";
export const Header = ()=>{
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

return(<>

<div className="bg-emerald text-white py-3 px-8 ">
   <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto flex items-center justify-between text-md">    
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="h-5 w-4 mr-2" />
          <span>+00123456789</span>
        </div>

      <div className="flex items-center space-x-4">
         <div className="relative">
            <button className="flex items-center space-x-1 hover:opacity-80">
              <span >Location</span>
              <FontAwesomeIcon icon={faLocationDot} className="h-4 w-3" />
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
               <button className="flex items-center text-emerald hover:text-gray-900 focus:outline-none">
                  Categories
                <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-3 w-3" />
               </button>
            </div>
            <Link  className="text-emerald hover:text-gray-900">
              Shop
            </Link>
            <Link  className="text-emerald hover:text-gray-900">
              Account
            </Link>
            <Link  className="text-emerald hover:text-gray-900">
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
            <Link href="/#" className="text-emerald hover:text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faCartShopping} className="h-5 w-5" />
              <span className="ml-2 ">Cart</span>
            </Link>

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
            <Link to="/" className="text-gray-800 font-semibold hover:border-b-2 mb-1 py-2 border-indigo-500">Category</Link><br/>
            <Link to="/aboutus" className="text-gray-800 font-semibold hover:border-b-2 py-2 border-indigo-500">Deals</Link>
            <Link href="#" className="block   py-2 text-gray-800 font-semibold hover:bg-blue-200">What's New</Link>
            <Link to="/portfolio" className="text-gray-800 font-semibold hover:border-b-2 py-2 border-indigo-500">Delivery</Link>   
         </div>
   </div>
</nav>
   

</>)
}
 export default Header;