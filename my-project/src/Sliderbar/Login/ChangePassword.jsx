import Index from '../Index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import  axios  from 'axios';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

export const changepassword = () => {

    useEffect(()=>{
        document.title = "Change Password"
    },[])
    const [message , setMessage] = useState('');    
    const formik = useFormik({
        initialValues: {
            oldpassword: '',
            newpassword: '',
            conformpassword: ''
        },
        validationSchema: Yup.object({
            oldpassword: Yup.string().required('Required'),
            newpassword: Yup.string().required('Required'),
            conformpassword:Yup.string().oneOf([Yup.ref("newpassword"), null], "Passwords must match").required("Confirm password is required"),            
        }),
        onSubmit: async(values) => {
            const formData = new FormData();
            formData.append("oldpassword",values.oldpassword);
            formData.append("newpassword",values.newpassword);
           const alpha = await axios.post("http://localhost:4000/changepassword",formData);
           setMessage(alpha.data.message);
           if(alpha.data.a){
            Swal.fire({
                text: "You Password Updated Sucessfully.",
                icon: "success"
              });
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
                Change password
                </h1>
            </div>
            <hr />
            <form onSubmit={formik.handleSubmit}>
            <div className="p-4 sm:px-8">        
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Old Password</label>
                <input type="password" name="oldpassword" id="oldpassword"
                 value={formik.values.oldpassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "/>
                {formik.touched.oldpassword && formik.errors.oldpassword && (
                <div className="text-red-500">{formik.errors.oldpassword}</div>
                )}
                <div className="text-red-500">{message}</div>
            </div>
            <div className="p-2 sm:px-8">        
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                <input type="password" name="newpassword" id="newpassword"
                 value={formik.values.newpassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "/>
                {formik.touched.newpassword && formik.errors.newpassword && (
                <div className="text-red-500">{formik.errors.newpassword}</div>
                )}
            </div>
            <div className="p-4 sm:px-8">        
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Conform Password</label>
                <input type="password" name="conformpassword" id="conformpassword"
                 value={formik.values.conformpassword} onChange={formik.handleChange} onBlur={formik.handleBlur}
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "/>
                {formik.touched.conformpassword && formik.errors.conformpassword && (
                <div className="text-red-500">{formik.errors.conformpassword}</div>
                )}
            </div>
            <div className="p-4 sm:px-8">
            <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 rounded py-1 px-3">
                Update
            </button>
            </div>
            </form>
        </div>
    </div>
    </div>
        </>)

};
export default changepassword;