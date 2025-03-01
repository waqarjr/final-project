import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Index from "../Index";

export const Creat_Carousel = ()=>{
const navigate = useNavigate();

useEffect(()=>{
    document.title = "Create Carousel";
},[])

const validationSchema = Yup.object({
    name :Yup.string().required("Name is required"),
    title :Yup.string().required("Name is required"),
    image :Yup.mixed().required("Image is required"),
    status : Yup.string().required("Please select any option ")
})

const formik = useFormik({
    initialValues:{
        name:"",
        title:"",
        image:null,
        status:""
    },
    validationSchema : validationSchema,
    onSubmit :async (values, { resetForm })=>{
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("title",values.title); 
        formData.append("status", values.status); 
        formData.append("image", values.image);
        const alpha = await axios.post("http://localhost:4000/creatcarousel",formData,{
            headers:{
                "Content-Type" :"multipart/form-data"
            }
        })
        if(alpha.data.message) 
        Swal.fire({
            title: "Success!",
            text: `${alpha.data.message}`,
            icon: "success",
            confirmButtonText: "OK",
            });
        resetForm();
    }
})

return(<>
<Index />   
<div className="sm:ml-64 mt-14 ">
    
    <div className="p-4">
        <p className="capitalize text-3xl font-sans py-4">Carousel</p>
    
    
    <div className=" bg-white w-full  rounded-lg border-2 border-slate-200  ">
        <div className="grid grid-cols-2 p-4 ">
            <div><p className="text-2xl font-light">Add New</p></div>
            <div className="justify-self-end">
                <button  onClick={()=>{navigate('/admin/carousel')}} className="bg-yellow-400 px-3 py-1 text-white border-none hover:bg-yellow-500 rounded text-right">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                 Back 
                </button>
            </div>
        </div><hr />    

        <form onSubmit={formik.handleSubmit}>
        
            <div className="p-4" >
                
                <label htmlFor="name" className="font-bold block">Name <span className="text-rose-700">*</span></label>
                <input type="text" id="name" 
                name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className=" border-2 w-full size-8 mt-2  rounded-md " /><br />
                {formik.touched.name && formik.errors.name &&(
                    <span className="text-red-500">{formik.errors.name}</span>
                )}

                <label htmlFor="title" className="font-bold block mt-2">Title <span className="text-rose-700">*</span></label>
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
                {formik.touched.image && formik.errors.image&&(
                    <span className="text-red-500">{formik.errors.image}</span>
                )}

            </div>

            <div className="p-4">
                <p className="font-bold">Status <span className="text-rose-700">*</span></p>
                <div className="[&>*]:p-2 mt-3">

                    <label htmlFor="disable">Disable</label>
                    <input type="radio" 
                     name="status" id="disable" value="disable" 
                    checked={formik.values.status  === "disable" } onChange={formik.handleChange}
                     />

                    <label htmlFor="enable">Enable</label>
                    <input type="radio" 
                     name="status" id="enable" value="enable" 
                    checked={formik.values.status  === "enable"} onChange={formik.handleChange}
                    /><br/>
                    {formik.touched.status && formik.errors.status &&(
                        <span className="text-red-500">{formik.errors.status }</span>
                    )}
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
export default Creat_Carousel;