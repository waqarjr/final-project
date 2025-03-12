import { useParams } from "react-router-dom";
import Index from "../Index";
import { useEffect, useState } from "react";
import axios from "axios";

export const View_orders = ()=>{

  const {id} = useParams();
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

    return(<>
    <Index/>
<div className="sm:ml-64 mt-14">
    <div className="p-2 border-b-2">
        <p className="capitalize text-3xl font-sans py-3 ">product categories</p>
    </div>
  <div className="p-2">
    <p className="capitalize text-2xl font-sans py-1 px-3">Customer Details</p>
    <div className="max-w-auto mx-auto p-6 bg-white shadow-md rounded-lg">
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
          {fetchData.map(item =>(
            <tr className="[&>*]:p-1 [&>*]:border-2 [&>*]:border-gray-300 " key={item._id}>
            <td><img src={item.image} alt="" width={100} className="mx-auto" /></td>
            <td width={400}>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.stock}</td>
            <td>{item.price * item.stock}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <div className="grid grid-cols-2 ">
      <div></div>
      <div>
        <h1 className="text-lg font-bold text-gray-800 mb-4 capitalize py-4 border-b-2">Shoping Cart Total</h1>
        <div className="flex items-center justify-between *:font-semibold *:text-gray-800" >
          <span>Total</span> <span>Rs. 2,000</span>
        </div>
      </div>
      </div>
    </div>

  </div>

</div> 

</>) 
}
export default View_orders;