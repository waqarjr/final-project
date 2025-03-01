import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Index from "../Index";

export const ProductRead = ()=>{
const navigate = useNavigate();
const [data ,setData] = useState([]);
const [readcategory , setReadCategory ] = useState([]);
const [readManufacturer , setReadManufacturer] = useState([]);
const [filterCategory , setFilterCategory] = useState('');
const [filterManufacturer , setFilterManufacturer] = useState('');
const [filterStatus , setFilterStatus] = useState('');
const [limit , setLimit] = useState('10');
const [search , setSearch] = useState('');

const category = async()=>{
  const data =  await axios.get("http://localhost:4000/readcategory");
  setReadCategory(data.data);
}
const manufacturer = async ()=>{
  const data = await axios.get("http://localhost:4000/readmanufacture");
  setReadManufacturer(data.data);
}
useEffect(()=>{
  category();
  manufacturer();
  document.title = 'Product';
},[])

const filterData = async(sendCategory,sendManufacturer,sendStatus,sendLimit)=>{
    const data =  await axios.post('http://localhost:4000/read-product',{category:sendCategory,manufacturer:sendManufacturer,status:sendStatus,limit:sendLimit})
    setData(data.data);
}
useEffect(()=>{
    filterData(filterCategory,filterManufacturer,filterStatus,limit);
},[filterCategory,filterManufacturer,filterStatus,limit])

const handleSearch = async(querySearch)=>   {
    const data = await axios.post("http://localhost:4000/read-product",{name:querySearch});
   setData(data.data)
}

useEffect(() => {
    const timeoutId = setTimeout(() => {
        handleSearch(search);
    }, 500); 
    
    return () => clearTimeout(timeoutId); 
}, [search]);

const deleteData = async(id)=>{    
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then( async (result) => {
            if (result.isConfirmed) {
            await axios.get(`http://localhost:4000/deletedata/${id}`)
            setData((prevData)=> prevData.filter((id)=> data._id !== id ));
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
}
const handleStatusChange = async(id, newStatus) => {
  const alpha =  await axios.post(`http://localhost:4000/selectupdatestate/${id}`,{ status: newStatus })
    if(alpha.data.message){
        const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
        });
        Toast.fire({
        icon: "success",
        title: "State has been updated sucessfully"
        });
    }
};
return(<>
    <Index/>
    <div className="sm:ml-64 mt-14">
        <div className=" p-4">
            <p className="text-3xl capitalize font-sans py-4 " > product </p>
         
        <div className="bg-white w-full  rounded-lg border-2 border-slate-200">
            <div className="grid grid-cols-2 p-4 ">
                <p className="text-2xl font-light">Products</p>
                <div className="justify-self-end">
                    <button  onClick={()=>{navigate('/admin/productscreat')}} className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded text-right">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add New
                    </button>
                </div>
            </div><hr />
            <div className="flex flex-wrap gap-3 lg:flex-nowrap lg:items-center p-2">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:flex [&>*]:py-2 [&>*]:px-3 [&>*]:border-2 [&>*]:rounded-md flex-grow">
                    <select value={limit} onChange={(e)=>setLimit(e.target.value)}>
                        <option  value="10">10</option>
                        <option value="20">20</option>
                        <option  value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="">All</option>
                    </select>
                    <select onChange={(e)=>setFilterCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        {readcategory.map((user,index)=>(
                          <option key={index} value={user._id} >{user.name}</option>
                        ))}

                    </select>
                    <select onChange={(e)=>setFilterManufacturer(e.target.value)}>
                        <option value="">All Manufacture</option>
                        {readManufacturer.map((user,index)=>(
                          <option key={index} value={user._id}>{user.name}</option>
                        ))}
                    </select>
                    <select onChange={(e)=>setFilterStatus(e.target.value)} >
                        <option value="" >All Status</option>
                        <option value="enable">Enable</option>
                        <option value="disable">Disable</option>
                    </select>
                </div>
                <input type="text" placeholder="Search" className="border-2 rounded-md py-2 px-3 w-full md:w-1/2 lg:w-auto ml-auto"
                onChange={(e)=>setSearch(e.target.value)} value={search}  />
                </div>

            <div className="p-2">
            <table className="border-2 w-full text-center">
                <thead className="bg-slate-100 ">
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300">
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {data.map((user ,index)=>(
                    <tr key={user._id} className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300">
                        <td>{index + 1}</td>
                        <td width={400} >{user.title}</td>
                        <td>{user.price}</td>
                        <td><img src={user.image} alt="image" width="80" className=" mx-auto" /></td>
                        <td>
                            <select defaultValue={user.status} onChange={(e) =>  handleStatusChange(user._id, e.target.value)}
                            className="md:w-[100px] lg:w-[150px] border-2 rounded-md" >
                            <option value="enable">Enable</option>
                            <option value="disable">Disable</option>
                            </select>
                        </td>
                        <td>
                        <Link to={`/admin/productupdate/${user._id}`}>
                        <button  type="button" className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded mr-3" >Edit</button>
                        </Link>
                        <button type="button" className="bg-yellow-400 px-3 py-1 text-white border-none hover:bg-yellow-500 rounded"
                        onClick={()=>deleteData(user._id)} >Delete</button>
                        </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot></tfoot>
            </table>
            <div className="flex justify-end mt-4">
            <button   onClick={() => setLimit(prev => Math.max(prev - 10, 10))} disabled={limit <= 10} 
                className="bg-gray-300 px-3 py-1 text-black border-none hover:bg-gray-400 rounded mr-3">
                Previous
            </button>
            <button onClick={() => setLimit(prev => prev + 10)} 
                className="bg-gray-300 px-3 py-1 text-black border-none hover:bg-gray-400 rounded">
                Next
            </button>
        </div>
        </div>
        </div>
    </div>
    </div>
</>)

}
export default ProductRead;