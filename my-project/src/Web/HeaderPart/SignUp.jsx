import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useMask } from '@react-input/mask';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState ,useEffect} from "react";
export const SignUp = ()=>{

  const [error , setError] = useState('');

  useEffect (()=>{
    document.title = "Sign Up";
  },[]);

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    firstname:Yup.string().required("First Name is required"),
    lastname:Yup.string().required("Last Name is required"),
    email:Yup.string().email().required("Email is required"),
    phone:Yup.string().required("Phone number is required").min(15, 'enter your valid Phone number'),
    password:Yup.string().required("password is required").min(5, 'password must be more then 5 digits'),
    conformpassword:Yup.string().oneOf([Yup.ref('password'),null],"password must match").required("comform Password is reqiured") 
  })
  const formik = useFormik({
    initialValues:{
      firstname:'',
      lastname:"",
      email:"",
      phone:"",
      password:"",
      conformpassword:""
    },
    validationSchema: validationSchema,
    onSubmit: async(value)=>{
      const formData = new FormData();
      formData.append("firstname",value.firstname);
      formData.append("lastname",value.lastname);
      formData.append("email",value.email);
      formData.append("phone",value.phone);
      formData.append('password',value.password);
      const alpha = await axios.post('http://localhost:4000/signup',formData);
      setError(alpha.data.message);
      if(alpha.data.sucess){
        localStorage.setItem('isSigup','true');
        localStorage.setItem('userFirstname',value.firstname);
        localStorage.setItem('userLastname',value.lastname);
        localStorage.setItem('userEmail',value.email);
        localStorage.setItem('userPhone',value.phone);
        Swal.fire({
          title: "Good job!",
          text: `${alpha.data.sucess}`,
          icon: "success"
        });
        navigate('/')
      }
    }
  })
  
  const useRef = useMask({
    mask: '+__ ___ _______',
    replacement: { _: /\d/ },
  })
return(<>
    <section className="bg-lightyellow ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-emerald md:text-2xl ">
          Sign up to your account
        </h1>
        <form className="space-y-2 md:space-y-4" onSubmit={formik.handleSubmit} >
          <div>
            <label htmlFor="firstname" className=" mb-1 text-sm font-medium text-emerald ">First Name *</label>
            <input type="text" name="firstname" id="firstname" value={formik.values.firstname} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="bg-gray-50  border border-emerald text-black rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-emerald   w-full p-2.5   " placeholder="name"  />
          </div>
          {formik.touched.firstname && formik.errors.firstname && (
            <span className="text-rose-500">{formik.errors.firstname}</span>
          )}
          <div>
            <label htmlFor="lastname" className=" mb-1 text-sm font-medium text-emerald ">Last Name *</label>
            <input type="text" name="lastname" id="lastname" value={formik.values.lastname} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="bg-gray-50  border border-emerald text-black rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-emerald   w-full p-2.5   " placeholder="last name"  />
          </div>
          {formik.touched.lastname &&  formik.errors.lastname && (
            <span className="text-rose-500" >{formik.errors.lastname}</span>
          )}
          <div>
            <label htmlFor="email" className=" mb-1 text-sm font-medium text-emerald ">Email *</label>
            <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="bg-gray-50  border border-emerald text-black rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-emerald   w-full p-2.5   " placeholder="name@company.com"  />
          </div>
          {formik.touched.email &&  formik.errors.email && (
            <span className="text-rose-500" >{formik.errors.email}</span>
          )} <p className="text-rose-500" >{error}</p>
          <div>
            <label htmlFor="phone"  className=" mb-1 text-sm font-medium text-emerald ">Phone *</label>
            <input type="text" ref={useRef} name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="bg-gray-50  border border-emerald text-black rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-emerald   w-full p-2.5   " placeholder="+92 123 4567890"  />
          </div>
          {formik.touched.phone &&  formik.errors.phone && (
            <span className="text-rose-500" >{formik.errors.phone}</span>
          )}
          <div>
            <label htmlFor="password" className=" mb-1 text-sm font-medium text-emerald ">Password *</label>
            <input type="password" name="password" id="password" placeholder="••••••••" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="bg-gray-50 border border-emerald text-black  rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-emerald  w-full p-2.5"/>
          </div>
          {formik.touched.password &&  formik.errors.password && (
            <span className="text-rose-500" >{formik.errors.password}</span>
          )}
          <div>
            <label htmlFor="conformpassword" className=" mb-1 text-sm font-medium text-emerald ">Conform Password *</label>
            <input type="password" name="conformpassword"  placeholder="••••••••" value={formik.values.conformpassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="bg-gray-50 border border-emerald text-black  rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-emerald  w-full p-2.5"/>
          </div>
          {formik.touched.conformpassword &&  formik.errors.conformpassword && (
            <span className="text-rose-500" >{formik.errors.conformpassword}<br /></span> 
          )}
          <div className="flex items-center justify-between" >
          <button type="submit" className=" text-white bg-emerald   font-medium rounded-sm text-sm px-5 py-2.5 text-center">Sign up</button>
          <span className="hover:underline text-emerald border-emerald  cursor-pointer " onClick={()=>{navigate('/signin')}}  >Sign in</span>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>
</>)
    
}
export default SignUp;