import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone,faLocationDot,faEnvelope, faCalendar, faClock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header";
import Footer from "../Footer";
import { useState,useEffect } from "react";
import axios from "axios";
export const ContactUs = ()=>{

  const [email, setEmail] = useState('');
    const [phoneNo1, setPhoneNo1] = useState('');
    const [phoneNo2, setPhoneNo2] = useState('');
    const [address , setAddress] = useState('');

  const constact_Data = async()=>{
    const data = await axios.get("http://localhost:4000/readwebsetting");
        setEmail(data.data[0].email);
        setPhoneNo1(data.data[0].phoneNo1);
        setPhoneNo2(data.data[0].phoneNo2);
        setAddress(data.data[0].address);
  }

  useEffect(()=>{
    constact_Data();
  },[])

return(<>
<Header/>
<div className="max-w-[1390px] mx-auto px-4 py-2">
  <div className='my-4 ' >
        <p className='text-gray-400' > <span className='hover:text-black cursor-pointer'>Home </span> &nbsp; &gt; &nbsp;<span className='hover:text-black cursor-pointer'  >Contact Us</span> </p>
    </div> <hr />
<div className="relative mx-auto    bg-slate-200 "  >
<div className="bg-[url('../../../public/contact-header-bg.jpg')]  w-full h-[400px] flex items-center justify-center">
<div className=" text-white text-center ">
    <h3 className="md:text-5xl text-2xl ">Contact Us  </h3>
    <p className="md:text-xl text-md  ">keep in touch with us</p>
</div>
</div>


</div>

<div className="container mx-auto px-4 py-12 max-w-7xl">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
            <h2 className="text-3xl font-semibold text-emerald mb-4">Contact Information</h2>
            <p className="text-gray-600 mb-8">
            Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl.
              Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
            </p>
            <div className="  grid md:grid-cols-[65%_auto] grid-cols-1">          
                <div >
                    <h3 className="text-lg font-semibold mb-4 text-center  text-emerald">Our Constact</h3>
                    <div className="space-y-2  ">
                        <div className="text-gray-600">
                            <span>
                                <FontAwesomeIcon icon={faLocationDot} className="mr-2 text-emerald" />{address}
                            </span>
                        </div>
                        <div className="text-gray-600">
                            <span  className="hover:text-gray-900">
                                <FontAwesomeIcon icon={faPhone} className="mr-1 text-emerald" /> {phoneNo1}
                            </span>
                        </div>
                        <div className="text-gray-600">
                            <span  className="hover:text-gray-900 ">
                                <FontAwesomeIcon icon={faPhone} className="mr-1 text-emerald" /> {phoneNo2}
                            </span>
                        </div>
                        <div className="text-gray-600">
                            <span  className="hover:text-gray-900">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-1 text-emerald" /> {email}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="gap-y-4">  
                    <h3 className="text-lg font-semibold mb-4 text-center text-emerald ">The Office</h3>
                    <div className="text-gray-600 space-x-2 grid grid-cols-[10%_auto]">
                        <span  className="hover:text-gray-900 ">
                            <FontAwesomeIcon icon={faClock} className="text-emerald" /> 
                        </span>
                        <span className="grid grid-cols-1 ">
                            <p>Monday -Sunday</p>
                            <p>10am - 9 am</p>              
                        </span>
                    </div>
                    <div className="text-gray-600 space-x-2 grid grid-cols-[10%_auto]">
                        <span  className="hover:text-gray-900 ">
                            <FontAwesomeIcon icon={faCalendar} className="text-emerald" /> 
                        </span>
                        <span className="grid grid-cols-1 ">
                            <p>Friday</p>
                            <p>Close</p>              
                        </span>
                    </div>
                    
              </div>
                
            </div>
        </div>

        <div>
            <h2 className="text-3xl font-semibold text-emerald mb-4">Got Any Questions?</h2>
            <p className="text-gray-600 mb-8">Use the form below to get in touch with the sales team</p>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input type="text" placeholder="First Name *"
                   className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent"/>
                </div>
                <div>
                  <input type="text" placeholder="Last Name *"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input type="email" placeholder="Email *"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent"/>
                </div>
                <div>
                  <input type="tel" placeholder="Phone"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent"/>
                </div>
              </div>

              <div className="mb-4">
                <input type="text" placeholder="Subject *"
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent" />
              </div>

              <div className="mb-6">
                <textarea
                  placeholder="Message *"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald focus:border-transparent"
                  
                ></textarea>
              </div>

              {/* <div className="mb-6">
                <div className="border border-gray-200 rounded-md p-4">
                  <div className="flex items-center">
                    <input type="checkbox"
                      id="recaptcha"
                      className="mr-1 h-5 w-5 text-emerald focus:ring-emerald"
                    />
                    <label htmlFor="recaptcha" className="text-gray-700">
                      I'm not a robot
                    </label>
                    <div className="ml-auto">
                      <div className="text-xs text-gray-500">reCAPTCHA</div>
                      <div className="text-xs text-gray-500">Privacy - Terms</div>
                    </div>
                  </div>
                </div>
              </div> */}

              <div className="text-right">
                <button type="submit"
                  className="inline-flex items-center px-6 py-3 border border-emerald text-emerald rounded-md hover:bg-emerald hover:text-white transition-colors duration-300">
                  SUBMIT <FontAwesomeIcon icon={faArrowRight} className="h-5 w-5 ml-2" />
                </button>
              </div>
            </form>
        </div>
        </div>
      </div>
</div>

<Footer/>
</>)

}
export default ContactUs;