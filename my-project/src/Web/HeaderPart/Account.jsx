import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../Footer"
import Header from "../Header"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Account = ()=>{
    const [toggle ,setToggle] = useState('dashbord');
    const [firstName , setFirstName] = useState();
    const [lastName , setLastName] = useState();
    const [phone , setPhone] = useState();
    const [email, setEmail] = useState();
    const [incorrect , setIncorrect] = useState('');
    const [error , setError] = useState('')
    const [fetchData , setFetchData] = useState([])
    const navigate = useNavigate();
    const forme = useFormik({
        initialValues:{
            signoutpassword:""
        },
        validationSchema:Yup.object({
            signoutpassword:Yup.string().required("Enter Your password"),
        }),
        onSubmit:async (values)=>{
            const email1 = localStorage.getItem("userEmail");
            const formData = new FormData();
            formData.append("email",email1);
            formData.append("signoutpassword",values.signoutpassword);
            const alpha = await axios.post('http://localhost:4000/signout',formData);
            setError(alpha.data.password1)
            if(alpha.data.a){
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userFirstname");
                localStorage.removeItem("userLastname");
                localStorage.removeItem("isSigup");
                navigate('/')
            }
        }
    })

    const formik = useFormik({
        initialValues:{
            currentpassword:'',
            newpassword:"",
            conformpassword:""
        },
        validationSchema: Yup.object({
            currentpassword : Yup.string().required("current password is required"),
            newpassword:Yup.string().required("please enter your new password"),
            conformpassword:Yup.string().oneOf([Yup.ref('newpassword'),null],"password must match").required("cofrompassword is required") 
        }),
        onSubmit: async(values,{resetForm})=>{
            const formData = new FormData();
            const email1 = localStorage.getItem("userEmail");
            formData.append("currentpassword",values.currentpassword);
            formData.append("newpassword",values.newpassword);
            formData.append("email",email1);
            const alll = await axios.post('http://localhost:4000/change-password',formData);
            setIncorrect(alll.data.message);
            if(alll.data.cong){
                resetForm();
            }
        }
    })

    const handleClick =(name)=>{
        setToggle(name)
    }

    
    const accountInfo = async()=>{
        const email1 = localStorage.getItem("userEmail");
        const alpha = await axios.post('http://localhost:4000/account-info',{email:email1})
        setFirstName(alpha.data.firstname);
        setLastName(alpha.data.lastname);
        setEmail(alpha.data.email);  
        setPhone(alpha.data.phone); 
    }
    const usetData = async()=>{
        const email1 = localStorage.getItem("userEmail");
        const alpha = await axios.post('http://localhost:4000/account-userdata',{email:email1})
        setFetchData(alpha.data);
    }
    useEffect(()=>{
        usetData()
        accountInfo()
        document.title ='Account';
    },[])

    return(<>
<Header/>
<div className="bg-[url('../../../public/page-header-bg.jpg')]  w-full  h-[150px] flex items-center justify-center">
    <div className=" text-center ">
        <h3 className="md:text-5xl text-2xl font-thin ">My Account </h3>
        <p className="md:text-xl text-md text-emerald ">Shop</p>
    </div>
</div>
<div className="max-w-7xl mx-auto ">
    <div className='my-8' >
        <p className='text-gray-400' > <span className='hover:text-black cursor-pointer' onClick={()=>{navigate('/')}} >Home </span> &nbsp; &gt; &nbsp;<span className='hover:text-black cursor-pointer'  >Account</span> </p>
    </div> <hr />
    <div className="grid grid-cols-[30%_auto] gap-6 my-5 ">
        <div>
            <div className="py-3 hover:text-emerald cursor-pointer">
                <p className="" > <FontAwesomeIcon icon={faUser}  className="mr-1"/>{firstName} {lastName} </p>
            </div><hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle == "dashbord" ? "text-emerald": ""}`} onClick={()=>{handleClick("dashbord")}}  >
                <p className="">Dashbord</p>
            </div><hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle == "orders" ? "text-emerald": ""}`} onClick={()=>{handleClick("orders")}}>
                <p>Orders</p>
            </div><hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle == "personalDetail" ? "text-emerald": ""}`}  onClick={()=>{handleClick("personalDetail")}}>
                <p>Personal Details</p>
            </div><hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle == "changepassword" ? "text-emerald": ""}`}  onClick={()=>{handleClick("changepassword")}}>
                <p>Change Password</p>
            </div><hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle == "signout" ? "text-emerald": ""}`} onClick={()=>{handleClick("signout")}}  >
                <p>Sign Out</p>
            </div><hr />
        </div>
        <div>
        <div className={`${toggle == "dashbord" ? "":"hidden"}`}>
            <div className="py-2" >
                <p className="text-2xl font-medium" >Recent Orders</p>
            </div>
            <table className="bg-gray-50 w-full ">
                <thead className="">
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 text-center ">
                        <td>#</td>
                        <td>Ammount</td>
                        <td>Status</td>
                        <td>Created at</td>
                        <td>Action</td>
                    </tr>
                </thead> 
                <tbody className="text-center">
                {fetchData.map((item,index) =>(
                  <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 text-center" key={item._id}>
                        <td>{index+1}</td>
                        <td>{item.amount}</td>
                        <td className="">{item.status}</td>
                        <td>{item.currentDate} {item.currentTime}</td>
                        <td>
                        <Link to={`/customerDetail/${item._id}`}  className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded">View</Link>
                        </td>
                    </tr>  
                ))}
                </tbody>
               
            </table>
        </div>    
        <div className={`${toggle == "orders" ? "":"hidden"}`}>
            <div className="py-2" >
                <p className="text-2xl font-medium" >Recent Orders</p>
            </div>
            <table className="bg-gray-50 w-full ">
                <thead className="">
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 text-center ">
                        <td>#</td>
                        <td>Ammount</td>
                        <td>Status</td>
                        <td>Created at</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 text-center">
                        <td>1</td>
                        <td>133</td>
                        <td>enable</td>
                        <td>waqar</td>
                        <td><button>Edit</button>| <button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>    
        <div className={`${toggle == "personalDetail" ? "":"hidden"}`} >
            <div className="py-2" >
                <p className="text-2xl font-medium" >Personal Details</p>
            </div>
            <li className=" w-full grid grid-cols-[30%_auto] py-3 text-gray-500" >
                <ol>First Name</ol>
                <ol>{firstName} </ol>
            </li><hr />
            <li className=" w-full grid grid-cols-[30%_auto] py-3 text-gray-500" >
                <ol>last Name</ol>
                <ol>{lastName}</ol>
            </li><hr />
            <li className=" w-full grid grid-cols-[30%_auto] py-3 text-gray-500" >
                <ol>Email</ol>
                <ol>{email}</ol>
            </li><hr />
            <li className=" w-full grid grid-cols-[30%_auto] py-3 text-gray-500" >
                <ol>Phone</ol>
                <ol>{phone}</ol>
            </li><hr />
        </div>
        
          <div className={`${toggle == "changepassword" ? "":"hidden"}`} >
            <form onSubmit={formik.handleSubmit}>
                <div className="py-2" >
                    <p className="text-2xl font-medium" >Change Password</p>
                </div>
                    <ol>
                        <p className="py-1 text-gray-400 ">Current Password *</p>
                        <input type="password" name="currentpassword" id="currentpassword" value={formik.values.currentpassword} onBlur={formik.handleBlur} onChange={formik.handleChange}
                        className="bg-gray-50 border border-emerald focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2 " />
                        {formik.touched.currentpassword && formik.errors.currentpassword && (
                            <span className="text-red-500">{formik.errors.currentpassword}</span>
                        )}<p className="text-red-500">{incorrect}</p>                    
                    </ol>
                    <ol>
                        <p className="py-1 text-gray-400 ">New Password *</p>
                        <input type="password" name="newpassword" id="newpassword"  value={formik.values.newpassword} onBlur={formik.handleBlur} onChange={formik.handleChange}
                        className="bg-gray-50 border border-emerald focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2 " />
                        {formik.touched.newpassword && formik.errors.newpassword && (
                            <span className="text-red-500" >{formik.errors.newpassword}</span>
                        )}
                    </ol>
                    <ol>
                        <p className="py-1 text-gray-400 ">Conform Password *</p>
                        <input type="password" name="conformpassword" id="conformpassword"  value={formik.values.conformpassword} onBlur={formik.handleBlur} onChange={formik.handleChange}
                        className="bg-gray-50 border border-emerald focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2 " />
                        {formik.touched.conformpassword && formik.errors.conformpassword && (
                            <span className="text-red-500" >{formik.errors.conformpassword}</span>
                        )}
                    </ol>
                    <button type="submit" className=" rounded-sm px-4 py-2 hover:bg-emerald text-emerald hover:text-white mt-3 border-emerald border-2 " > Submit </button>
            </form>
          </div>
          <div className={`${toggle == "signout" ? "":"hidden"}`} >
            <ol>
                <p className="py-1 text-gray-400 ">Enter Your Password</p>
                <form onSubmit={forme.handleSubmit}>
                    <input type="password" name="signoutpassword" id="signoutpassword" value={forme.values.signoutpassword} onBlur={forme.handleBlur} onChange={forme.handleChange}
                    className="bg-gray-50 border border-emerald focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2 " />
                    {forme.touched.signoutpassword && forme.errors.signoutpassword && (
                        <span className="text-red-500" >{formik.errors.signoutpassword}</span>
                    )}<br/><span className="text-red-500" >{error}</span>
                    <button type="submit" className=" rounded-sm px-4 py-2 hover:bg-emerald text-emerald hover:text-white mt-3 border-emerald border-2 " > Submit </button>
                </form>
            </ol>
          </div>              
        </div>
    </div>
</div>

<Footer/>
    </>)
}
export default Account;