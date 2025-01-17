import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Read_manufacture = ()=>{
    const navigate =  useNavigate();
    const [data , setData] = useState([]);
    const read_image = async ()=>{
        const data = await axios.get("http://localhost:4000/readmanufacture");
        setData(data.data);
    }
    const delete_image = async (id)=>{    
    const conform = confirm("Are you Sure to delete this ?")
    if(conform){
        const del =  await axios.get(`http://localhost:4000/deletemanufacture/${id}`)
        alert(del.data.message);
        setData((prevData) => prevData.filter((data) => data._id !== id));
    }
    }
    const handleStatusChange = async(id, newStatus) => {
        await axios.post(`http://localhost:4000/selectupdate_manufacture/${id}`,{ status: newStatus })
    };
    
    useEffect(()=>{
        read_image();
    },[])
return(<>
<div className="sm:ml-64 mt-14">
    <div className=" p-4">
        <p className="text-3xl capitalize font-sans " > product categories</p>
    </div>
    <div className="max-w-7xl   bg-white shadow-sm mx-3 rounded-md ">
        <div className="grid grid-cols-2 p-4 ">
            <p className="text-2xl font-light">Categories</p>
            <div className="justify-self-end">
                <button  onClick={()=>{navigate('/manufacturecreat')}} className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded">
                    Add New
                </button>
            </div>
        </div><hr />

        <div className=" grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1  p-4 " >
            <div className="p-2">
                <input type="date" className="w-full border-2  rounded-md " id="date" />
            </div>
            <div className="p-2">
                <input type="date" className="w-full border-2  rounded-md " id="date" />
            </div>
            <div className="p-2">
                <input type="text" placeholder="All" className="w-full border-2  rounded-md " id="date" />
            </div>
            <div className="p-2">
                <input type="text" placeholder="Search" className="w-full border-2  rounded-md " id="date" />
            </div>
        </div>  

        <div className="p-2">
            <table border="4" className="border-2 table-fixed w-full text-center">
                <thead className="bg-slate-100 ">
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 ">
                        <th>#</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user,index)=>(
                    <tr key={user._id} className="[&>*]:p-1 [&>*]:border-2 [&>*]:border-gray-300 " >
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td><img src={user.image} alt="image" width="80" className=" mx-auto" /></td>
                    <td>
                    <select defaultValue={user.status} onChange={(e) =>  handleStatusChange(user._id, e.target.value)}
                        className="w-[150px] border-2 rounded-md" >
                        <option value="enable">Enable</option>
                        <option value="disable">Disable</option>
                    </select>
                    </td>
                    <td>
                        <Link to={`/manufactureupdate/${user._id}`}  >
                        <button  type="button" className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded mr-3" >Edit</button>
                        </Link>
                        <button type="button" className="bg-yellow-400 px-3 py-1 text-white border-none hover:bg-yellow-500 rounded"
                        onClick={()=>delete_image(user._id)} >Delete</button>
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
export default Read_manufacture;