import { useEffect, useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Index from "../Index";
export const CategoriesRead = ()=>{
    const navigate =  useNavigate();
    const [data , setData] = useState([]);

    const read_image = async ()=>{
        const data = await axios.get("http://localhost:4000/readcarousel");
        setData(data.data);
    }
    useEffect(()=>{
        read_image();
        document.title = "Carousel";
    },[])
    
    const delete_image = async (id)=>{    
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
            await axios.get(`http://localhost:4000/deletecarousel/${id}`)
            setData((prevData) => prevData.filter((data) => data._id !== id));
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          });
    
    }
    const handleStatusChange = async(id, newStatus) => {
     const alpha =  await axios.post(`http://localhost:4000/selectupdatecarousel/${id}`,{ status: newStatus })   
        if(alpha.data.message){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            });
            Toast.fire({
            icon: "success",
            title: `${alpha.data.message}`
            });
        }
    };
    
    
return(<>
<Index />
<div className="sm:ml-64 mt-14">
    <div className=" p-4">
        <p className="capitalize text-3xl font-sans py-4 " > Carousel</p>
    
    <div className="bg-white w-full  rounded-lg border-2 border-slate-200">
        <div className="grid grid-cols-2 p-4 ">
            <p className="text-2xl font-light">Categories</p>
            <div className="justify-self-end">
                <button  onClick={()=>{navigate('/admin/carouselcreat')}} className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded">
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  Add New
                </button>
            </div>
        </div><hr />

          

        <div className="p-2">
            <table border="4" className="border-2  w-full text-center">
                <thead className="bg-slate-100 ">
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 ">
                        <th width='50px'>#</th>
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
                    <td ><img src={user.image} alt="image" width="200" className=" mx-auto" /></td>
                    <td>
                    <select defaultValue={user.status} onChange={(e) =>  handleStatusChange(user._id, e.target.value)}
                        className="w-[150px] border-2 rounded-md" >
                        <option value="enable">Enable</option>
                        <option value="disable">Disable</option>
                    </select>
                    </td>
                    <td>
                        <Link to={`/admin/carouselupdate/${user._id}`}  >
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
</div>
</>)
}
export default CategoriesRead;