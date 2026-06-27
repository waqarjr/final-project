import Index from '../Index';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

export const ChangePassword = () => {
  useEffect(() => {
    document.title = "Change Password";
  }, []);

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldpassword: '',
      newpassword: '',
      conformpassword: ''
    },
    validationSchema: Yup.object({
      oldpassword: Yup.string().required('Required'),
      newpassword: Yup.string().required('Required').min(8, "Must be at least 8 characters"),
      conformpassword: Yup.string().oneOf([Yup.ref("newpassword"), null], "Passwords must match").required("Confirm password is required"),            
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setMessage('');
      try {
        const formData = new FormData();
        formData.append("oldpassword", values.oldpassword);
        formData.append("newpassword", values.newpassword);

        const response = await axios.post("http://localhost:4000/changepassword", formData, {
          withCredentials: true // JWT admin verification
        });

        if (response.data.a) {
          resetForm();
          Swal.fire({
            text: "Your password has been updated successfully.",
            icon: "success"
          });
        } else {
          setMessage(response.data.message || "Failed to update password.");
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.response?.data?.error || "Error changing password.";
        setMessage(errorMsg);
        Swal.fire({
          title: "Error!",
          text: errorMsg,
          icon: "error"
        });
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <>
      <Index />
      <div className="sm:ml-64 md:mt-0 mt-14">
        <div className="flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Change password
              </h1>
            </div>
            <hr />
            <form onSubmit={formik.handleSubmit}>
              <div className="p-4 sm:px-8">        
                <label htmlFor="oldpassword" className="block mb-2 text-sm font-medium text-gray-900 ">Old Password</label>
                <input
                  type="password"
                  name="oldpassword"
                  id="oldpassword"
                  value={formik.values.oldpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                />
                {formik.touched.oldpassword && formik.errors.oldpassword && (
                  <div className="text-red-500 text-xs mt-1 block">{formik.errors.oldpassword}</div>
                )}
                {message && <div className="text-red-500 text-xs mt-1 block">{message}</div>}
              </div>
              <div className="p-2 sm:px-8">        
                <label htmlFor="newpassword" className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                <input
                  type="password"
                  name="newpassword"
                  id="newpassword"
                  value={formik.values.newpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                />
                {formik.touched.newpassword && formik.errors.newpassword && (
                  <div className="text-red-500 text-xs mt-1 block">{formik.errors.newpassword}</div>
                )}
              </div>
              <div className="p-4 sm:px-8">        
                <label htmlFor="conformpassword" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm Password</label>
                <input
                  type="password"
                  name="conformpassword"
                  id="conformpassword"
                  value={formik.values.conformpassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                />
                {formik.touched.conformpassword && formik.errors.conformpassword && (
                  <div className="text-red-500 text-xs mt-1 block">{formik.errors.conformpassword}</div>
                )}
              </div>
              <div className="p-4 sm:px-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white hover:bg-blue-600 rounded py-1 px-3 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;