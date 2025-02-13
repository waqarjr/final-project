import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export const ProductRead = ()=>{
const navigate = useNavigate();
const [data ,setData] = useState([]);

const [readcategory , setReadCategory ] = useState([]);
const [readManufacturer , setReadManufacturer] = useState([]);

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
},[])

const readData = async()=>{
  const data = await axios.get('http://localhost:4000/read-product'); 
  setData(data.data);
}
useEffect(()=>{
readData();
})

const deleteData = async(id)=>{
    let alpha = confirm("Are You Sure To Delete This ?");
    if(alpha){
        const a = await axios.get(`http://localhost:4000/deletedata/${id}`)
        alert(a.data.message);
        setData((prevData)=> prevData.filter((id)=> data._id !== id ))
    }
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
    <div className="sm:ml-64 mt-14">
        
        <div className=" p-4">
            <p className="text-3xl capitalize font-sans py-4 " > product </p>
         

        <div className="bg-white w-full  rounded-lg border-2 border-slate-200">
            <div className="grid grid-cols-2 p-4 ">
                <p className="text-2xl font-light">Products</p>
                <div className="justify-self-end">
                    <button  onClick={()=>{navigate('/productscreat')}} className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded text-right">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Add New
                    </button>
                </div>
            </div><hr />
            <div className="flex flex-wrap gap-3 lg:flex-nowrap lg:items-center p-2">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:flex [&>*]:py-2 [&>*]:px-3 [&>*]:border-2 [&>*]:rounded-md flex-grow">
                    <select>
                        <option value="">10</option>
                        <option value="">20</option>
                        <option value="">30</option>
                        <option value="">All</option>
                    </select>
                    <select>
                        <option value="">All Categories</option>
                        {readcategory.map((user,index)=>(
                          <option key={index} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <select>
                        <option value="">All Manufacture</option>
                        {readManufacturer.map((user,index)=>(
                          <option key={index} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                    <select>
                        <option value="">All Status</option>
                        <option>Enable</option>
                        <option>Disable</option>
                    </select>
                </div>
                <input type="text" placeholder="Search" className="border-2 rounded-md py-2 px-3 w-full md:w-1/2 lg:w-auto ml-auto"/>
                </div>

            <div className="p-2">
            <table className="border-2 w-full text-center">
                <thead className="bg-slate-100 ">
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300">
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                  {data.map((user ,index)=>(
                    <tr key={user._id} className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300">
                        <td>{index + 1}</td>
                        <td>{user.title}</td>
                        <td><img src={user.image} alt="image" width="80" className=" mx-auto" /></td>
                        <td>
                            <select defaultValue={user.status} onChange={(e) =>  handleStatusChange(user._id, e.target.value)}
                            className="md:w-[100px] lg:w-[150px] border-2 rounded-md" >
                            <option value="enable">Enable</option>
                            <option value="disable">Disable</option>
                            </select>
                        </td>
                        <td>
                        <Link to={`/productupdate/${user._id}`}>
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
        </div>
        </div>
    </div>
    </div>
</>)

}
export default ProductRead;