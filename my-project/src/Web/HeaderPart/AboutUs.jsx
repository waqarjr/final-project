import axios from "axios";
import Footer from "../Footer";
import Header from "../Header"
import { useEffect } from "react";
export const AboutUs = ()=>{

const EmailSend = async()=>{
    await axios.post('http://localhost:4000/email');
}

useEffect(()=>{
    document.title = "About Us"
},[])

return(<>
<Header/>
<div className="bg-[url('../../../public/page-header-bg.jpg')]  w-full  h-[150px] flex items-center justify-center">
    <div className=" text-center ">
        <h3 className="md:text-5xl text-2xl font-thin ">About Us </h3>
        <p className="md:text-xl text-md text-emerald ">Shop</p>
    </div>
</div>
<div className="max-w-7xl mx-auto ">
    <div className='my-8' >
        <p className='text-gray-400' > <span className='hover:text-black cursor-pointer' onClick={()=>{navigate('/')}} >Home </span> &nbsp; &gt; &nbsp;<span className='hover:text-black cursor-pointer'  >About Us</span> </p>
    </div> <hr />
<button className="m-3 bg-yellow-400 px-4 py-2 rounded text-white" onClick={EmailSend} >Mail Me</button>
</div>    
<Footer/>
</>)
}
export default AboutUs;