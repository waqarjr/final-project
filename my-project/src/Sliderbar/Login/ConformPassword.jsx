import { useState,useEffect } from "react";
import Index from "../Index";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const ConformPassword = () => {

     useEffect(()=>{
            document.title = "Conform Password"
        },[])

    const [message , setMessage] = useState('');
     const Navigate = useNavigate();   
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Required')
        }),
        onSubmit: async(values) => {
            console.log(values);
          const formData = new FormData();
          formData.append("password", values.password);
          const responce = await axios.post("http://localhost:4000/conformpassword", formData);
          setMessage(responce.data.message);  
          if(responce.data.a){
              sessionStorage.setItem("changepassword","true")
              Navigate("/admin/changepassword");
          }
        }
      });

    return(<>
<Index/>
<div className="sm:ml-64  md:mt-0 mt-14">
<div className="flex  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
        <div className="p-6  sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Waqar Ahmad
            </h1>
        </div>
        <hr />
        <div className="p-4 sm:px-8">
            <h1 className=" text-center  leading-tight tracking-tight  ">
            This is a secure area of the application. <br /> Please confirm your password before continuing.
            </h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
        <div className="p-4 sm:px-8">        
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your Password</label>
            <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "/>
            {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
            )}
            <div className="text-red-500">{message}</div>
        </div>
        <div className="p-4 sm:px-8">
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
export default ConformPassword;