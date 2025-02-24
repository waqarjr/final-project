import {Link} from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faEnvelope, faLocationDot, faPhone, faVoicemail } from "@fortawesome/free-solid-svg-icons";
export default function Footer() {
  return (
    <footer className="bg-[#f8ffe5] w-full px-4 sm:px-6 lg:px-12  mt-[200px]">
      <div className="w-full mx-auto grid grid-cols-1  lg:grid-cols-[30%_auto] gap-4">

        <div className="">
          <div className="flex items-center space-x-2">
            <img src="../../public/waqarjr.png" alt="waqar jr" className=" md:w-[200px] w-[150px] "/>
          </div>
          <p className="text-gray-600 text-justify ">
            Welcome to waqarjr shop, your ultimate destination for top-tier laptops, PCs, and accessories.
            Explore our curated collection for the latest in cutting-edge technology, all at competitive prices. Upgrade
            your setup with ease and convenience at waqarjr shop today!
          </p>
          <div className="flex space-x-4 mt-4">
            <span className="text-gray-500">Social Media</span>
            <Link href="#" className="text-gray-400 hover:text-blue-600">
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400">
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-pink-600">
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-red-600">
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
          </div>
        </div>

    <div className="grid md:grid-cols-3 grid-cols-1 gap-2 " >    
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Shop
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Speaker
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Printer
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <div className="space-y-2">
            <p className="text-gray-600 flex items-start">
                <div>
                    <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-[#06d6a0]" />9 Asim Plaza,Tehsil Road Aamir Colony,Okara,PK
                </div>
            </p>
            <p className="text-gray-600">
              <Link href="tel:+923317407677" className="hover:text-gray-900">
                <FontAwesomeIcon icon={faPhone} className="text-[#06d6a0]" /> +923317407677
              </Link>
            </p>
            <p className="text-gray-600">
              <Link href="tel:+923217407677" className="hover:text-gray-900 ">
              <FontAwesomeIcon icon={faPhone} className="text-[#06d6a0]" /> +923217407677
              </Link>
            </p>
            <p className="text-gray-600">
              <Link href="mailto:support@alibabacomputer.com" className="hover:text-gray-900">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#06d6a0]" /> support@alibabacomputer.com
              </Link>
            </p>
          </div>
        </div>
        </div>    
      </div> <hr className="my-4" />
        <div className="flex items-center pb-2 text-gray-600 "> 
             Copyright &copy; 2025 waqarjr. All Rights Reserved
        </div>    
    </footer>
  )
}

