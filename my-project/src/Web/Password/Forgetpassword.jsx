import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ForgetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset Password
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Forget Password";
  }, []);

  // Formik for Step 1: Send Email
  const emailFormik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Email is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        const response = await axios.post('http://localhost:4000/forgetemail', formData);
        
        if (response.data.message) {
          setEmail(values.email);
          Swal.fire({
            title: "OTP Sent!",
            text: response.data.message,
            icon: "success"
          });
          setStep(2); // Move to OTP step
        }
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.response?.data?.error || err.response?.data?.message || "Failed to send reset email.",
          icon: "error"
        });
      } finally {
        setLoading(false);
      }
    }
  });

  // Formik for Step 2: Verify OTP
  const otpFormik = useFormik({
    initialValues: { otp: "" },
    validationSchema: Yup.object({
      otp: Yup.string().length(6, "OTP must be 6 digits").required("OTP is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("otp", values.otp);
        const response = await axios.post('http://localhost:4000/verify-otp', formData);
        
        if (response.data.message) {
          Swal.fire({
            title: "Verified!",
            text: response.data.message,
            icon: "success"
          });
          setStep(3); // Move to Reset Password step
        }
      } catch (err) {
        Swal.fire({
          title: "Verification Failed!",
          text: err.response?.data?.error || err.response?.data?.message || "Invalid or expired OTP.",
          icon: "error"
        });
      } finally {
        setLoading(false);
      }
    }
  });

  // Formik for Step 3: Reset Password
  const resetFormik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: Yup.object({
      password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords must match").required("Confirm password is required")
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", values.password);
        const response = await axios.post('http://localhost:4000/reset-password', formData);
        
        if (response.data.message) {
          Swal.fire({
            title: "Success!",
            text: response.data.message,
            icon: "success"
          });
          navigate('/signin');
        }
      } catch (err) {
        Swal.fire({
          title: "Reset Failed!",
          text: err.response?.data?.error || err.response?.data?.message || "Failed to reset password.",
          icon: "error"
        });
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <>
      <section className="bg-lightyellow ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-emerald ">
            <img className="w-28" src="../../../public/waqarjr.png" alt="logo" />
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-emerald md:text-2xl ">
                {step === 1 && "Forget Password"}
                {step === 2 && "Enter Verification OTP"}
                {step === 3 && "Reset Your Password"}
              </h1>

              {step === 1 && (
                <form className="space-y-4" onSubmit={emailFormik.handleSubmit}>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-emerald ">Your email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={emailFormik.values.email}
                      onChange={emailFormik.handleChange}
                      onBlur={emailFormik.handleBlur}
                      className="bg-gray-50 border border-emerald rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2.5"
                      placeholder="name@company.com"
                    />
                    {emailFormik.touched.email && emailFormik.errors.email && (
                      <span className="text-red-500 text-xs mt-1 block">{emailFormik.errors.email}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white bg-emerald font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                  <p className="text-sm font-light text-gray-500 text-center">
                    Remember password? <Link to='/signin' className="font-medium text-emerald hover:underline ">Sign In</Link>
                  </p>
                </form>
              )}

              {step === 2 && (
                <form className="space-y-4" onSubmit={otpFormik.handleSubmit}>
                  <div>
                    <label htmlFor="otp" className="block mb-2 text-sm font-medium text-emerald ">6-Digit OTP</label>
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      maxLength={6}
                      value={otpFormik.values.otp}
                      onChange={otpFormik.handleChange}
                      onBlur={otpFormik.handleBlur}
                      className="bg-gray-50 border border-emerald rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2.5 text-center font-bold tracking-widest text-lg"
                      placeholder="123456"
                    />
                    {otpFormik.touched.otp && otpFormik.errors.otp && (
                      <span className="text-red-500 text-xs mt-1 block">{otpFormik.errors.otp}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white bg-emerald font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full text-emerald border border-emerald font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Back
                  </button>
                </form>
              )}

              {step === 3 && (
                <form className="space-y-4" onSubmit={resetFormik.handleSubmit}>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-emerald ">New Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={resetFormik.values.password}
                      onChange={resetFormik.handleChange}
                      onBlur={resetFormik.handleBlur}
                      className="bg-gray-50 border border-emerald rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2.5"
                    />
                    {resetFormik.touched.password && resetFormik.errors.password && (
                      <span className="text-red-500 text-xs mt-1 block">{resetFormik.errors.password}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-emerald ">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      value={resetFormik.values.confirmPassword}
                      onChange={resetFormik.handleChange}
                      onBlur={resetFormik.handleBlur}
                      className="bg-gray-50 border border-emerald rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2.5"
                    />
                    {resetFormik.touched.confirmPassword && resetFormik.errors.confirmPassword && (
                      <span className="text-red-500 text-xs mt-1 block">{resetFormik.errors.confirmPassword}</span>
                    )}
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white bg-emerald font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;