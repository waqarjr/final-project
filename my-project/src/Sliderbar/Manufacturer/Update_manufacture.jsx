import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Update_manufacture = ()=>{

const {id} = useParams();    
const navigate = useNavigate();

const [name , setName ] = useState('');
const [image , setImage] = useState('');
const [status , setStatus] = useState('');
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
})


const formik = useFormik({
    initialValues:{
        name:name,
        image:image,
        status:status,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values)=>{
        
        const  formData = new FormData();
        formData.append('name',values.name),
        formData.append('status',values.status),
        formData.append('image',values.image)
        const alpha = await axios.post(`http://localhost:4000/updatemanufacture/${id}`,formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        alert(alpha.data.mes);
    }
})


const apiFetch = async(id)=>{
    const data = await axios.get(`http://localhost:4000/readupdatemanufacture/${id}`)
    setName(data.data.name);
    setImage(data.data.image);
    setStatus(data.data.status);
}

useEffect(()=>{
apiFetch(id); 
},[id])

return(<>
<div className="sm:ml-64 mt-14 ">
    
    <div className="p-4">
        <p className="capitalize text-3xl font-sans">product categories</p>
    </div>
    
    <div className="p-4 bg-white w-full shadow-xl ">
        <div className="grid grid-cols-2 p-4 ">
            <div><p className="text-2xl font-light">Update Categories</p></div>
            <div className="justify-self-end">
                <button   className="bg-yellow-400 px-3 py-1 text-white border-none hover:bg-yellow-500 rounded text-right"
                 onClick={()=>{navigate("/manufacture")}}
                 >Back
                </button>
            </div>
        </div><hr />    

        <form onSubmit={formik.handleSubmit} >
            <div className="p-4" >
                
                <label htmlFor="name" className="font-bold block">Name <span className="text-rose-700">*</span></label>
                <input type="text" id="name" 
                name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className=" border-2 w-full size-8 mt-2  rounded-md " /><br />
                {formik.touched.name && formik.errors.name &&(
                    <span className="text-red-500">{formik.errors.name}</span>
                )}

                <label htmlFor="picure" className="block font-bold mt-3 ">Picture <span className="text-rose-700">*</span></label>
                <input type="file" id="image" 
                name="image"  onChange={(e)=>formik.setFieldValue("image",e.currentTarget.files[0])}
                className="border-2 w-full  mt-2  rounded-lg p-2 " />
                
                <img src={image} alt="image" width="80"  />
            </div>

            <div className="p-4">
                <p className="font-bold">Status <span className="text-rose-700">*</span></p>
                <div className="[&>*]:p-2 mt-3">

                    <label htmlFor="disable">Disable</label>
                    <input type="radio" name="status" id="disable" value="disable" 
                    checked={formik.values.status  === "disable" } onChange={formik.handleChange}
                     />
                    <label htmlFor="enable">Enable</label>
                    <input type="radio" name="status" id="enable" value="enable" 
                    checked={formik.values.status  === "enable"} onChange={formik.handleChange}
                    /><br/>
                </div>

                <div className="mt-6">
                    <input type="checkbox" name="navbar" id="navbar" /> 
                    <label htmlFor="navbar"> Show on Navbar</label>
                </div>
            </div>

            <div className="mt-5 bg-slate-200 p-4 rounded-lg ">
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded py-1 px-3">
                    Submit
                </button>
            </div>

        </form>
    </div>
</div> 

</>)

}
export default Update_manufacture;