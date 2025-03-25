import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Index from "../Index";
export const Update_Carousel = ()=>{

const {id} = useParams();    
const navigate = useNavigate();
const [name , setName ] = useState('');
const [title , setTitle ] = useState('');
const [image , setImage] = useState('');
const [status , setStatus] = useState('');
const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
})


const formik = useFormik({
    initialValues:{
        name:name,
        image:image,
        title:title,
        status:status,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values)=>{
        
        const  formData = new FormData();
        formData.append('name',values.name),
        formData.append('title',values.title),
        formData.append('status',values.status),
        formData.append('image',values.image)
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
            }).then( async(result) => {
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                await axios.post(`http://localhost:4000/updatecarousel/${id}`,formData,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
            });
    
    }
})


const apiFetch = async(id)=>{
    const data = await axios.get(`http://localhost:4000/readupdatecarousel/${id}`)
    setName(data.data.name);
    setImage(data.data.image);
    setStatus(data.data.status);
    setTitle(data.data.title);
}

useEffect(()=>{
apiFetch(id); 
document.title = "Update Carousel";
},[id])

return(<>
<Index />
<div className="sm:ml-64 mt-14 ">
    
    <div className="p-4">
        <p className="capitalize text-3xl font-sans py-4">product categories</p>
    
    
    <div className=" bg-white w-full rounded-lg border-2 border-gray-200 ">
        <div className="grid grid-cols-2 p-4 ">
            <div><p className="text-2xl font-light">Update Categories</p></div>
            <div className="justify-self-end">
                <button   className="bg-yellow-400 px-3 py-1 text-white border-none hover:bg-yellow-500 rounded text-right"
                 onClick={()=>{navigate("/admin/carousel")}}>
                 <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />   Back
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
                <label htmlFor="name" className="font-bold block">Name <span className="text-rose-700">*</span></label>
                <input type="text" id="title" 
                name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className=" border-2 w-full size-8 mt-2  rounded-md " /><br />
                {formik.touched.title && formik.errors.title &&(
                    <span className="text-red-500">{formik.errors.title}</span>
                )}

                <label htmlFor="picure" className="block font-bold mt-3 ">Picture <span className="text-rose-700">*</span></label>
                <input type="file" id="image" 
                name="image"  onChange={(e)=>formik.setFieldValue("image",e.currentTarget.files[0])}
                className="border-2 w-full  mt-2  rounded-lg p-2 " />
                
                <img src={image} alt="image" width="300" className="mx-1 my-2  "  />
            </div>

            <div className="p-4">
                <p className="font-bold">Status <span className="text-rose-700">*</span></p>
                <div className="[&>*]:p-2 mt-2  ">

                    <label htmlFor="disable">Disable</label>
                    <input type="radio" name="status" id="disable" value="disable" 
                    checked={formik.values.status  === "disable" } onChange={formik.handleChange}
                     />
                    <label htmlFor="enable">Enable</label>
                    <input type="radio" name="status" id="enable" value="enable" 
                    checked={formik.values.status  === "enable"} onChange={formik.handleChange}
                    /><br/>
                </div>
            </div>

            <div className="mt-5 bg-slate-200 p-4 ">
                <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 rounded py-1 px-3">
                    Submit
                </button>
            </div>

        </form>
    </div>
</div> 
</div>
</>)

}
export default Update_Carousel;