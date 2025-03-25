import React,{useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import Index from "../Index";

export const Icon_change = ()=>{
    
    const [icon,setIcon] = useState(null);    
    useEffect(()=>{
        const fetchIcon = async()=>{
            const {data} = await axios.get("http://localhost:4000/readicon");
            setIcon(data[0].icon);
        }
        document.title = "Icon Setting";
        fetchIcon();
    },[])
    const formik = useFormik({
        initialValues:{
            icon:"",
        },
        validationSchema:Yup.object({
            icon:Yup.string().required("Required!"),
        }),
        onSubmit:async(values)=>{
            const formData = new FormData();
            formData.append("icon",values.icon);
            Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
            }).then( async(result) => {
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
                await axios.post("http://localhost:4000/updateicon",formData,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
            });
        }
    })
    return(<>
        <Index/>
        <div className="sm:ml-64 mt-14 ">
    <div className="p-4">
        <p className="capitalize text-3xl font-sans py-4 ">Icon</p>
        <div className=" bg-white w-full  rounded-lg border-2 border-slate-200 "> 
            <div className="p-4 ">
            <p className="text-2xl font-light">Update Icon</p>
            </div><hr />
                <form onSubmit={formik.handleSubmit}>
            <div className="p-4">
            <label htmlFor="picure" className="block font-bold mt-3 ">Picture <span className="text-rose-700">*</span></label>
                <input type="file" id="icon" 
                name="icon"  onChange={(e)=>formik.setFieldValue("icon",e.currentTarget.files[0])}
                className="border-2 w-full  mt-2  rounded-lg p-2 " />
                {formik.touched.icon && formik.errors.icon&&(
                    <span className="text-red-500">{formik.errors.icon}</span>
                )}
            </div>
            <img src={icon} width='150px' alt=""  className=" m-4 rounded-md shadow-lg"  />
                <div className="mt-5 bg-slate-200 p-4 ">
                    <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 rounded py-1 px-3">
                        Update
                    </button>
                </div>
                </form>
        </div>
    </div>
</div>
    </>)

}
export default Icon_change;