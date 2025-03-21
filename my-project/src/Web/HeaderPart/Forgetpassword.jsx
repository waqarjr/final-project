import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";

export const ForgetPassword  = ()=>{

    const navigate = useNavigate();
    const validationSchema = Yup.object({
      email:Yup.string().email().required("Email is required"),
    })
    useEffect (()=>{
      document.title = "Forget Password";
    },[])
    const formik = useFormik({
      initialValues:{
        email:"",
      },
      validationSchema: validationSchema,
      onSubmit: async(value)=>{
        const formData = new FormData();
        formData.append("email",value.email);
        const alpha = await axios.post('http://localhost:4000/forgetemail',formData);
        if(alpha.data){
            navigate('/otp');

        }
      }
    })   
    
return(<>
<section className="bg-lightyellow ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-emerald ">
      <img className="w-28" src="../../../public/waqarjr.png" alt="logo" />
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-emerald md:text-2xl ">
          Forget password
        </h1>
        <form className="space-y-2 md:space-y-4" onSubmit={formik.handleSubmit} >
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-emerald ">Your email</label>
            <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="bg-gray-50  border border-emerald rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-emerald  block w-full p-2.5   " placeholder="name@company.com"  />
          </div>
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500" >{formik.errors.email}</span>
            )}<br />
          <button type="submit" className="w-full text-white bg-emerald font-medium rounded-lg text-sm px-5 py-2.5 text-center">Enter</button>
          <p className="text-sm font-light text-gray-500 ">
            Don't have an account yet? <Link to='/signin' className="font-medium text-emerald hover:underline ">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>
</>)
}
