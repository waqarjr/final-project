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
import Swal from "sweetalert2";

export const Account = () => {
  const [toggle, setToggle] = useState('dashbord');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [incorrect, setIncorrect] = useState('');
  const [error, setError] = useState('');
  const [fetchData, setFetchData] = useState([]);
  const navigate = useNavigate();

  const verifyCredentialsConfig = { withCredentials: true };

  const forme = useFormik({
    initialValues: {
      signoutpassword: ""
    },
    validationSchema: Yup.object({
      signoutpassword: Yup.string().required("Enter your password to sign out"),
    }),
    onSubmit: async (values) => {
      setError('');
      try {
        const email1 = localStorage.getItem("userEmail");
        const formData = new FormData();
        formData.append("email", email1);
        formData.append("signoutpassword", values.signoutpassword);

        const response = await axios.post('http://localhost:4000/signout', formData, verifyCredentialsConfig);
        if (response.data.a) {
          localStorage.clear();
          Swal.fire({
            title: "Logged Out",
            text: "You have signed out successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
          navigate('/');
        } else {
          setError(response.data.password1 || "Invalid password.");
        }
      } catch (err) {
        setError(err.response?.data?.message || err.response?.data?.error || "Logout failed. Please check password.");
      }
    }
  });

  const formik = useFormik({
    initialValues: {
      currentpassword: '',
      newpassword: "",
      conformpassword: ""
    },
    validationSchema: Yup.object({
      currentpassword: Yup.string().required("Current password is required"),
      newpassword: Yup.string().required("New password is required").min(8, "Must be at least 8 characters"),
      conformpassword: Yup.string().oneOf([Yup.ref('newpassword'), null], "Passwords must match").required("Confirm password is required")
    }),
    onSubmit: async (values, { resetForm }) => {
      setIncorrect('');
      try {
        const formData = new FormData();
        formData.append("currentpassword", values.currentpassword);
        formData.append("newpassword", values.newpassword);
        
        const response = await axios.post('http://localhost:4000/change-password', formData, verifyCredentialsConfig);
        
        if (response.data.cong) {
          resetForm();
          Swal.fire({
            title: "Updated!",
            text: response.data.cong,
            icon: "success"
          });
        } else {
          setIncorrect(response.data.message || "Failed to update password.");
        }
      } catch (err) {
        setIncorrect(err.response?.data?.message || err.response?.data?.error || "Error updating password.");
      }
    }
  });

  const handleClick = (name) => {
    setToggle(name);
  };

  const accountInfo = async () => {
    try {
      const response = await axios.post('http://localhost:4000/account-info', {}, verifyCredentialsConfig);
      setFirstName(response.data.firstname);
      setLastName(response.data.lastname);
      setEmail(response.data.email);
      setPhone(response.data.phone);
    } catch (err) {
      console.error("Failed to fetch account info", err);
    }
  };

  const usetData = async () => {
    try {
      const response = await axios.post('http://localhost:4000/account-userdata', {}, verifyCredentialsConfig);
      setFetchData(response.data);
    } catch (err) {
      console.error("Failed to fetch customer orders", err);
    }
  };

  useEffect(() => {
    usetData();
    accountInfo();
    document.title = 'Account';
  }, []);

  return (
    <>
      <Header />
      <div className="bg-[url('../../../public/page-header-bg.jpg')] w-full h-[150px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="md:text-5xl text-2xl font-thin">My Account</h3>
          <p className="md:text-xl text-md text-emerald">Shop</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className='my-8'>
          <p className='text-gray-400'>
            <span className='hover:text-black cursor-pointer' onClick={() => { navigate('/') }}>Home</span> &nbsp; &gt; &nbsp;
            <span className='hover:text-black cursor-pointer'>Account</span>
          </p>
        </div>
        <hr />
        <div className="grid grid-cols-[30%_auto] gap-6 my-5">
          <div>
            <div className="py-3 hover:text-emerald cursor-pointer">
              <p><FontAwesomeIcon icon={faUser} className="mr-1" />{firstName} {lastName}</p>
            </div>
            <hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle === "dashbord" ? "text-emerald" : ""}`} onClick={() => { handleClick("dashbord") }}>
              <p>Dashboard</p>
            </div>
            <hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle === "orders" ? "text-emerald" : ""}`} onClick={() => { handleClick("orders") }}>
              <p>Orders</p>
            </div>
            <hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle === "personalDetail" ? "text-emerald" : ""}`} onClick={() => { handleClick("personalDetail") }}>
              <p>Personal Details</p>
            </div>
            <hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle === "changepassword" ? "text-emerald" : ""}`} onClick={() => { handleClick("changepassword") }}>
              <p>Change Password</p>
            </div>
            <hr />
            <div className={`py-3 hover:text-emerald cursor-pointer ${toggle === "signout" ? "text-emerald" : ""}`} onClick={() => { handleClick("signout") }}>
              <p>Sign Out</p>
            </div>
            <hr />
          </div>
          <div>
            <div className={`${toggle === "dashbord" ? "" : "hidden"}`}>
              <div className="py-2">
                <p className="text-2xl font-medium">Recent Orders</p>
              </div>
              <table className="bg-gray-50 w-full">
                <thead>
                  <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 text-center font-bold">
                    <td>#</td>
                    <td>Amount</td>
                    <td>Status</td>
                    <td>Created at</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {fetchData.map((item, index) => (
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 text-center" key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.amount}</td>
                      <td>{item.status}</td>
                      <td>{item.currentDate} {item.currentTime}</td>
                      <td>
                        <Link to={`/customerDetail/${item._id}`} className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`${toggle === "orders" ? "" : "hidden"}`}>
              <div className="py-2">
                <p className="text-2xl font-medium">All Orders</p>
              </div>
              <table className="bg-gray-50 w-full">
                <thead>
                  <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 text-center font-bold">
                    <td>#</td>
                    <td>Amount</td>
                    <td>Status</td>
                    <td>Created at</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {fetchData.map((item, index) => (
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 text-center" key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.amount}</td>
                      <td>{item.status}</td>
                      <td>{item.currentDate} {item.currentTime}</td>
                      <td>
                        <Link to={`/customerDetail/${item._id}`} className="bg-blue-600 px-3 py-1 text-white border-none hover:bg-blue-700 rounded">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={`${toggle === "personalDetail" ? "" : "hidden"}`}>
              <div className="py-2">
                <p className="text-2xl font-medium">Personal Details</p>
              </div>
              <div className="w-full grid grid-cols-[30%_auto] py-3 text-gray-500 border-b">
                <span>First Name</span>
                <span className="font-semibold text-black">{firstName}</span>
              </div>
              <div className="w-full grid grid-cols-[30%_auto] py-3 text-gray-500 border-b">
                <span>Last Name</span>
                <span className="font-semibold text-black">{lastName}</span>
              </div>
              <div className="w-full grid grid-cols-[30%_auto] py-3 text-gray-500 border-b">
                <span>Email</span>
                <span className="font-semibold text-black">{email}</span>
              </div>
              <div className="w-full grid grid-cols-[30%_auto] py-3 text-gray-500 border-b">
                <span>Phone</span>
                <span className="font-semibold text-black">{phone}</span>
              </div>
            </div>

            <div className={`${toggle === "changepassword" ? "" : "hidden"}`}>
              <form onSubmit={formik.handleSubmit}>
                <div className="py-2">
                  <p className="text-2xl font-medium">Change Password</p>
                </div>
                <div className="mb-3">
                  <p className="py-1 text-gray-400">Current Password *</p>
                  <input
                    type="password"
                    name="currentpassword"
                    id="currentpassword"
                    value={formik.values.currentpassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-emerald focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2"
                  />
                  {formik.touched.currentpassword && formik.errors.currentpassword && (
                    <span className="text-red-500 text-xs mt-1 block">{formik.errors.currentpassword}</span>
                  )}
                  {incorrect && <p className="text-red-500 text-xs mt-1 block">{incorrect}</p>}
                </div>
                <div className="mb-3">
                  <p className="py-1 text-gray-400">New Password *</p>
                  <input
                    type="password"
                    name="newpassword"
                    id="newpassword"
                    value={formik.values.newpassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-emerald focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2"
                  />
                  {formik.touched.newpassword && formik.errors.newpassword && (
                    <span className="text-red-500 text-xs mt-1 block">{formik.errors.newpassword}</span>
                  )}
                </div>
                <div className="mb-3">
                  <p className="py-1 text-gray-400">Confirm Password *</p>
                  <input
                    type="password"
                    name="conformpassword"
                    id="conformpassword"
                    value={formik.values.conformpassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    className="bg-gray-50 border border-emerald focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2"
                  />
                  {formik.touched.conformpassword && formik.errors.conformpassword && (
                    <span className="text-red-500 text-xs mt-1 block">{formik.errors.conformpassword}</span>
                  )}
                </div>
                <button type="submit" className="rounded-sm px-4 py-2 hover:bg-emerald text-emerald hover:text-white mt-3 border-emerald border-2">Submit</button>
              </form>
            </div>
            <div className={`${toggle === "signout" ? "" : "hidden"}`}>
              <div className="mb-3">
                <p className="py-1 text-gray-400 font-medium">Enter your password to sign out</p>
                <form onSubmit={forme.handleSubmit}>
                  <input
                    type="password"
                    name="signoutpassword"
                    id="signoutpassword"
                    value={forme.values.signoutpassword}
                    onBlur={forme.handleBlur}
                    onChange={forme.handleChange}
                    className="bg-gray-50 border border-emerald focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2"
                  />
                  {forme.touched.signoutpassword && forme.errors.signoutpassword && (
                    <span className="text-red-500 text-xs mt-1 block">{forme.errors.signoutpassword}</span>
                  )}
                  {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
                  <button type="submit" className="rounded-sm px-4 py-2 hover:bg-emerald text-emerald hover:text-white mt-3 border-emerald border-2">Sign Out</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;