import * as Yup from "yup";
import {useFormik} from "formik";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useMask } from '@react-input/mask';
import Index from "../Index";
export const Contact_Us = ()=>{

    const [email , setEmail] = useState('');
    const [phoneNo1 , setPhoneNo1] =  useState('');
    const [phoneNo2 , setPhoneNo2] = useState('');
    const [address , setAddress] = useState('');
    const [id , setId] = useState('');
    const readData = async ()=>{
        const data = await axios.get("http://localhost:4000/readwebsetting");
        setEmail(data.data[0].email);
        setPhoneNo1(data.data[0].phoneNo1);
        setPhoneNo2(data.data[0].phoneNo2);
        setAddress(data.data[0].address);
        setId(data.data[0]._id);
    }
    useEffect(()=>{
        readData();
        document.title = "Contact Us Setting";
    },[])

    
const inputRef = useMask({
    mask: '+__ ___ _______',
    replacement: { _: /\d/ },
  });
const inputRef1 = useMask({
    mask: '+__ ___ _______',
    replacement: { _: /\d/ },
  });

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Email is required"),
        phoneNo1: Yup.string().required("Phone number is required"),
        phoneNo2: Yup.string(),
        address: Yup.string().required("Address is required"),
      })
    
    const formik = useFormik({
        initialValues:{
            email:email,
            phoneNo1:phoneNo1,
            phoneNo2:phoneNo2,
            address:address,
        },
        enableReinitialize: true,
        validationSchema : validationSchema,
        onSubmit : async(values)=>{
            const formData =new FormData();
            formData.append('email',values.email);
            formData.append('phoneNo1', values.phoneNo1);
            formData.append('phoneNo2',values.phoneNo2);
            formData.append('address',values.address);
            formData.append('id',id);
            Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
            }).then(async (result) => {
            if(result.isConfirmed) {
                await axios.post('http://localhost:4000/updatewebsetting',formData)
                Swal.fire("Saved!", "", "success");
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
        <p className="capitalize text-3xl font-sans py-4 ">Contact Us Setting</p>
        <div className=" bg-white w-full  rounded-lg border-2 border-slate-200 "> 
            <div className="p-4 ">
            <p className="text-2xl font-light">Contact us Details</p>
            </div><hr />
            <form onSubmit={formik.handleSubmit}>
            <div className="p-4">
                <table border="4" className="border-2  w-full font-bold">
                    <tbody> 
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300  ">
                    <td className="w-[20%]" >Email</td>
                    <td>
                        <input type="text" className="border-2 w-full  my-2  rounded-lg p-2  " id="email" name="email"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-red-500">{formik.errors.email}</span>
                        )}
                    </td>
                    </tr>
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 ">
                    <td  className="w-[20%]">Phone no 1</td>
                    <td><input type="text" ref={inputRef1} className="border-2 w-full  my-2  rounded-lg p-2 " id="phoneNo1" name="phoneNo1"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phoneNo1}/>
                    {formik.touched.phoneNo1 && formik.errors.phoneNo1 && (
                        <span className="text-red-500">{formik.errors.phoneNo1}</span>
                    )}
                    </td> 
                    </tr>
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 ">
                        <td  className="w-[20%]">Phone no 2</td>
                        <td>
                        <input type="text" ref={inputRef} className="border-2 w-full  my-2  rounded-lg p-2 " id="phoneNo2" name="phoneNo2" 
                        onChange={(e)=>setPhoneNo2(e.target.value)} onBlur={formik.handleBlur} value={formik.values.phoneNo2}  />
                        </td>
                    </tr>
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 ">
                        <td  className="w-[20%]">Address</td>
                        <td><input type="text" className="border-2 w-full  my-2  rounded-lg p-2 " id="address" name="address"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
                        {formik.touched.address && formik.errors.address&& (
                            <span className="text-red-500">{formik.errors.address}</span>
                        )}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
                <div className="  bg-slate-200 p-4 ">
                <button type="submit" className="bg-blue-500 text-white hover:bg-blue-600 rounded py-1 px-4">
                    Update
                </button>
                </div>
            </form>
        </div>
    </div>
</div>
</>)
}
export default Contact_Us;