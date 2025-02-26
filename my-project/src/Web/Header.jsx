import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUser, faChevronDown, faMagnifyingGlass ,  faPhone,faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { Link } from "react-router-dom";
export const Header = ()=>{
   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
   const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

return(<>


<div className="bg-[#06d6a0] text-white py-2 px-4">
   <div className="w-full px-4 sm:px-6 lg:px-12 mx-auto flex items-center justify-between text-sm">
       
        <div className="flex items-center">
          <FontAwesomeIcon icon={faPhone} className="h-3 w-3 mr-2" />
          <span>+00123456789</span>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <span>Get 50% Off on Selected Items</span>
          <span className="mx-2">|</span>
          <a href="#" className="hover:underline">
            Shop Now
          </a>
        </div>

      <div className="flex items-center space-x-4">
         <div className="relative">
            <button
              className="flex items-center space-x-1 hover:opacity-80"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <span>Eng</span>
              <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
            </button>

            {isLanguageOpen && (
              <div className="absolute top-full right-0 mt-2 w-24 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  English
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Español
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Français
                </a>
              </div>
            )}
         </div>

         <div className="relative">
            <button className="flex items-center space-x-1 hover:opacity-80"
              onClick={() => setIsLocationOpen(!isLocationOpen)} >
              <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3" />
              <span>Location</span>
              <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
            </button>

            {isLocationOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white text-gray-800 rounded-md shadow-lg py-1 z-50">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  New York
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  London
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Paris
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                  Tokyo
                </a>
              </div>
            )}
         </div>
      </div>
   </div>
</div>

   
<nav className="border-b bg-[#f8ffe5]">
   <div className="w-full px-2  sm:px-6 lg:px-12">
      <div className="flex items-center justify-between h-16">
         <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img src="../../public/waqarjr.png" alt="" className="w-[150px]" />
            </Link>
         </div>

         <div className="hidden lg:flex items-center space-x-8 md:px-4">
            <div className="relative">
               <button className="flex items-center text-[#06d6a0] hover:text-gray-900 focus:outline-none"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} >
                  Categories
                <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-3 w-3" />
               </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <Link href="#" className="block px-4 py-2 text-sm text-[#06d6a0] hover:bg-gray-100">
                      Electronics
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-[#06d6a0] hover:bg-gray-100">
                      Fashion
                    </Link>
                    <Link href="#" className="block px-4 py-2 text-sm text-[#06d6a0] hover:bg-gray-100">
                      Home & Garden
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/deals" className="text-[#06d6a0] hover:text-gray-900">
              Deals
            </Link>
            <Link href="/whats-new" className="text-[#06d6a0] hover:text-gray-900">
              What&apos;s New
            </Link>
            <Link href="/delivery" className="text-[#06d6a0] hover:text-gray-900">
              Delivery
            </Link>
         </div>

         <div className=" hidden sm:flex flex-1 md:w-full lg:max-w-md sm:px-4 px-2">
            <div className="relative w-full">
               <FontAwesomeIcon icon={faMagnifyingGlass}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3 sm:h-4 sm:w-4" />
               <input type="search" placeholder="Search Product"
                className="w-full pl-10 pr-2  sm:pr-4 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"/>
            </div>
         </div>

         <div className="flex items-center space-x-2  md:space-x-4">
            <Link href="/#" className="text-[#06d6a0] hover:text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
              <span className="ml-2 ">Account</span>
            </Link>
            <Link href="/#" className="text-[#06d6a0] hover:text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faCartShopping} className="h-5 w-5" />
              <span className="ml-2 ">Cart</span>
            </Link>

            <div className="lg:hidden flex items-center">
               <button className="mobile-menu-button p-2 sm:p-4 " onClick={()=>{setIsMobileMenuOpen(!isMobileMenuOpen)}} > 
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
               </button>
            </div>     
         </div>
      </div>
         <div id="mobile-menu" 
         className={`lg:hidden w-full overflow-hidden transition-all duration-300 ease-in-out text-center
            ${isMobileMenuOpen  ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} bg-[#f8ffe5]`} >
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