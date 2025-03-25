import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

export const Admin = () => {    

  const [mess , setMess] = useState("");
  const [showPass , setShowPass] = useState(false);
  const  navigate  = useNavigate();

  useEffect(() => {
    document.title = "Admin Login";
    const isAuthenticated = localStorage.getItem("isAdminLoggedIn");
    if (isAuthenticated) {
      navigate("/admin/dashbord"); 
    }

  },[]);
  
  

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required')
        }),
        onSubmit: async(values) => {
          const formData = new FormData();
          formData.append("email", values.email);
          formData.append("password", values.password);
          const responce = await axios.post("http://localhost:4000/login", formData);
          if(responce.data.a){
            localStorage.setItem("isAdminLoggedIn", "true");
            window.location.href = "/admin/dashbord";
          }
          setMess(responce.data.message);
        }
      });

    return (<>
    
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
      Flowbite    
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500">{formik.errors.email}</div>
          )}

          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type={`${showPass ? 'text' : 'password'}`} name="password" id="password" placeholder="waqar03" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} 
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          </div>
            {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
            )}
          <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="remember" onClick={()=>{setShowPass(!showPass)}} className="text-gray-500 dark:text-gray-300">Show Password</label>
            </div>
          </div>
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
          </div>
          <button type="submit" 
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Sign in
            </button>
          <div className="flex items-center justify-center  text-red-500">
            {mess}
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

    </>);

};

export default Admin;