import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const ProductRead = ()=>{
const navigate = useNavigate();
const [data ,setData] = useState([]);

const readData = async()=>{
  const data = await axios.get('http://localhost:4000/read-product'); 
  setData(data.data);
}
useEffect(()=>{
readData();
})

return(<>
    <div className="sm:ml-64 mt-14">
        
        <div className=" p-4">
            <p className="text-3xl capitalize font-sans " > product </p>
        </div> 

        <div className="max-w-7xl   bg-white shadow-sm mx-3 rounded-md ">
            <div className="grid grid-cols-2 p-4 ">
                <p className="text-2xl font-light">Products</p>
                <div className="justify-self-end">
                    <button  onClick={()=>{navigate('/productscreat')}} className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded text-right">
                        Add New
                    </button>
                </div>
            </div><hr />
            <div className=" [&>*]:m-3 [&>*]:ml-4 [&>*]:py-2 [&>*]:px-3 [&>*]:border-2 [&>*]:rounded-md">
                <select name="" id=""  >
                    <option value="">10</option>
                    <option value="">20</option>
                    <option value="">30</option>
                    <option value="">All</option>
                </select>
                <select name="" id="" >
                    <option value="">All Categories</option>
                    <option>Loptop</option>
                    <option>Mobile</option>
                    <option>Computer</option>
                    <option>LED</option>
                </select>
                <select name="" id="" >
                    <option value="">All Manufacture</option>
                    <option>Dell</option>
                    <option>Lenovo</option>
                    <option>HP</option>
                    <option>Toshiba</option>
                    
                </select>
                <select name="" id="" >
                    <option value="">All Status</option>
                    <option>Enable</option>
                    <option>Disable</option>
                </select>
                <input type="text" placeholder="Search" className="border-2 float-right "/>
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
                        <td>{user.status}</td>
                        <td>
                        <Link to={`/productupdate/${user._id}`}>
                        <button  type="button" className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded mr-3" >Edit</button>
                        </Link>
                        <button type="button" className="bg-yellow-400 px-3 py-1 text-white border-none hover:bg-yellow-500 rounded"
                        onClick={()=>{}} >Delete</button>
                        </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
        </div>
    </div>
</>)

}
export default ProductRead;