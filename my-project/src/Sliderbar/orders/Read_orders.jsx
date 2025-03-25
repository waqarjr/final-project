import Index from "../Index";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Read_orders = ()=>{ 
const [fetchData , setFromData] = useState([]);

const customerOrders = async()=>{
   const data = await axios.get("http://localhost:4000/customerorder")
    setFromData(data.data);
}

useEffect(()=>{
    customerOrders();
    document.title = "Orders"
},[])

const handleStatusChange = async(id,value)=>{
    const data = await axios.post("http://localhost:4000/customer-status",{id:id,status:value})
    if(data.data.message){
    const Toast = Swal.mixin({
        toast: true, position: "top-end", timer: 2000, timerProgressBar: true,showConfirmButton: false,
        });
        Toast.fire({
        icon: "success", title: `${data.data.message}`
        });
    }
}

return(<>
<Index/>
<div className="sm:ml-64 mt-14">
<div className="p-4">
    <p className="capitalize text-3xl font-sans py-4 ">Customers Orders</p>
    
    <div className="bg-white w-full  rounded-lg border-2 border-slate-200">
        <div className="grid grid-cols-2 p-4 ">
            <p className="text-2xl font-light">Orders</p>
        </div><hr />

        <div className=" grid md:grid-cols-4 sm:grid-cols-2  grid-cols-1   " >
            <div className="p-2">
                <input type="date"  className="w-full border-2 p-1 rounded-md " id="date" />
            </div>
            <div className="p-2">
                <input type="date" className="w-full border-2 p-1 rounded-md " id="date" />
            </div>
            <div className="p-2">
                <select name="" id="" className=" p-[6px] w-full border-2 text-center  rounded-md">
                    <option value="">All</option>
                    <option value="enable">Enable</option>
                    <option value="disable">Disable</option>
                </select>
            </div>
            <div className="p-2">
                <input type="text" placeholder="Search" className="w-full border-2 p-[6px]  rounded-md" id="date" />
            </div>
        </div>  

        <div className="p-2">
            <table border="4" className="border-2  w-full text-center">
                <thead className="bg-slate-100 ">
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 ">
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th>Action</th>
                    </tr>
                </thead>    
                <tbody>
                    {fetchData.map((item ,index) =>(
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 [&>*]:font-normal"  key={index}>
                        <th  >{index+1}</th>
                        <th>{item.firstname} {item.lastname}</th>
                        <th>{item.amount}</th>
                        <th>
                            <select defaultValue={item.status} onChange={(e) =>  handleStatusChange(item._id, e.target.value)}
                            className="w-[150px] border-2 rounded-md" >
                            <option value="pending">Pending</option>
                            <option value="progressing">Progressing</option>
                            <option value="complete">Complete</option>
                            <option value="cancel">Cancel</option>
                            </select>
                            </th>
                        <th>{item.currentDate} {item.currentTime}</th>
                        <th>
                            <Link to={`/admin/orders/${item._id}`} className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded">View</Link>
                        </th>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>        
    </div>
</div>
</div>
</>)        
}
export default Read_orders;