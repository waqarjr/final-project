import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header";
import Footer from "../Footer";

export const CustomerDetail = ()=>{

  const {id} = useParams();
  const navigate = useNavigate();
  const [fetchData ,setFetchData] = useState([]);

  const [firstName , setFirstName] = useState();
  const [lastName , setLastName] = useState();
  const [email , setEmail] = useState();
  const [phone,setPhone] = useState();
  const [postCode , setPostCode] = useState();
  const [city , setCity] = useState()
  const [currentTime , setCurrentTime] = useState();
  const [currentDate , setCurrentDate] = useState();
  const [status , setStatus] = useState();
  const [address ,setAdress] = useState();

  const customerData =  async(id)=>{   

  const data =  await axios.post(`http://localhost:4000/siglecus-data/${id}`);

  setFirstName(data.data.firstname);
  setLastName(data.data.lastname); 
  setEmail(data.data.email);
  setAdress(data.data.address);
  setPhone(data.data.phone);
  setPostCode(data.data.postcode);
  setCity(data.data.city);
  setCurrentTime(data.data.currentTime);
  setCurrentDate(data.data.currentDate);
  setStatus(data.data.status); 

}
  const customerProduct = async(id)=>{
    const data =   await axios.post(`http://localhost:4000/singcus-product/${id}`)
  setFetchData(data.data)
  }
  useEffect(()=>{
    customerData(id)
    customerProduct(id)
  },[id])

  let total = 0;
  fetchData.map(item =>{
   total += item._doc.price * item.quantity;
  })
    return(<>
  <Header/>  
  <div className="bg-[url('../../../public/page-header-bg.jpg')]  w-full  h-[150px] flex items-center justify-center">
    <div className=" text-center ">
        <h3 className="md:text-5xl text-2xl font-thin ">My Account </h3>
        <p className="md:text-xl text-md text-emerald ">Shop</p>
    </div>
</div>
    <div className="max-w-7xl mx-auto ">
    <div className='my-8' >
        <p className='text-gray-400' > <span className='hover:text-black cursor-pointer' onClick={()=>{navigate('/')}} >Home </span> &nbsp; &gt; &nbsp;<span className='hover:text-black cursor-pointer'  >Account</span> </p>
    </div> <hr />
    
  <div className="p-2">
    <div className="max-w-auto mx-auto p-4   bg-white ">
      <div className="grid grid-cols-2 justify-between px-3">
        <span className="capitalize text-2xl font-sans pb-4 ">Customer Details</span>
        <span onClick={()=>{navigate('/account')}} className="bg-yellow-400 cursor-pointer py-1 h-8 px-2 justify-self-end text-white border-none hover:bg-yellow-300 rounded">
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Account
        </span>
      </div>
      <div className="mb-6">
        <div className="grid grid-cols-[20%_auto] border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 p-4 font-medium text-gray-700 border-b border-r border-gray-200">Name</div>
          <div className="p-4 text-gray-800 border-b border-gray-200">{firstName} {lastName}</div>
          <div className="bg-gray-50 p-4 font-medium text-gray-700 border-b border-r border-gray-200">Phone No</div>
          <div className="p-4 text-gray-800 border-b border-gray-200">{phone}</div>
          <div className="bg-gray-50 p-4 font-medium text-gray-700 border-b border-r border-gray-200">Email</div>
          <div className="p-4 text-gray-800 border-b border-gray-200">{email}</div>
          <div className="bg-gray-50 p-4 font-medium text-gray-700 border-b border-r border-gray-200">Address</div>
          <div className="p-4 text-gray-800 border-b border-gray-200">{address}</div>
          <div className="bg-gray-50 p-4 font-medium text-gray-700 border-b border-r border-gray-200">City</div>
          <div className="p-4 text-gray-800 border-b border-gray-200">{city}</div>
          <div className="bg-gray-50 p-4 font-medium text-gray-700 sm:border-r border-gray-200">Postal Code</div>
          <div className="p-4 text-gray-800">{postCode}</div>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-4 capitalize ">Products Order Details</h2>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 bg-gray-50 *:p-4 *:font-medium *:text-gray-700 *:border-r *:border-gray-200 *:text-center">
          <div>Order Status</div>
          <div>Created At</div>
        </div>
        <div className="grid grid-cols-2 *:p-4 *:text-gray-800 *:border-r *:border-gray-200 *:text-center">
          <div>{status}</div>
          <div>{currentDate} {currentTime}</div>
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-800  capitalize py-4">Products Details</h2>
      <table className="border-2  w-full text-center rounded-lg">
        <thead className="bg-gray-50 "> 
          <tr className="*:p-3 *:border-2 *:border-gray-300 *:font-semibold *:text-gray-800">
            <td>Product</td>
            <td>Name</td>
            <td>Price</td>
            <td>Qty</td>
            <td>Total Price</td>
          </tr>
        </thead>
        <tbody>
          {fetchData.map((item,index) =>(
            <tr className="[&>*]:p-1 [&>*]:border-2 [&>*]:border-gray-300 " key={index}>
            <td><img src={item._doc.image} alt="" width={100} className="mx-auto" /></td>
            <td width={400}>{item._doc.title}</td>
            <td>{item._doc.price}</td>
            <td>{item.quantity}</td>
            <td>{item._doc.price * item.quantity}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className="grid grid-cols-2 ">
      <div></div>
      <div>
        <h1 className="text-lg font-bold text-gray-800 mb-4 capitalize py-4 border-b-2">Shoping Cart Total</h1>
        <div className="flex items-center justify-between *:font-semibold *:text-gray-800" >
          <span>Total</span> <span>Rs. {total}</span>
        </div>
      </div>
      </div>
    </div>

  </div>
  </div> 
<Footer/>
</>) 
}
export default CustomerDetail;