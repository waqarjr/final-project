import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const Signin = () => {
  const [checkEmail, setCheckEmail] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required")
  });

  useEffect(() => {
    document.title = "Sign In";
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      setLoading(true);
      setCheckEmail('');
      setCheckPassword('');
      try {
        const formData = new FormData();
        formData.append("email", value.email);
        formData.append('password', value.password);
        
        // Pass withCredentials: true to allow httpOnly cookies to be set
        const response = await axios.post('http://localhost:4000/signin', formData, {
          withCredentials: true
        });

        if (response.data && !response.data.email1 && !response.data.password1) {
          const first = response.data.firstname;
          const second = response.data.lastname;
          const third = response.data.email;
          const phone = response.data.phone;
          
          localStorage.setItem('userFirstname', first);
          localStorage.setItem('userLastname', second);
          localStorage.setItem('userEmail', third);
          localStorage.setItem("userPhone", phone);
          localStorage.setItem('isSigup', 'true');
          
          Swal.fire({
            title: "Logged In!",
            text: "Welcome back!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false
          });
          
          navigate('/');
        } else {
          if (response.data.email1) setCheckEmail(response.data.email1);
          if (response.data.password1) setCheckPassword(response.data.password1);
        }
      } catch (err) {
        const errorMsg = err.response?.data?.message || err.response?.data?.error || "Failed to sign in. Please try again.";
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
      <section className="bg-lightyellow ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-emerald ">
            <img className="w-28" src="../../../public/waqarjr.png" alt="logo" />
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-emerald md:text-2xl ">
                Sign in to your account
              </h1>
              <form className="space-y-2 md:space-y-4" onSubmit={formik.handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-emerald ">Your email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-emerald rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2.5"
                    placeholder="name@company.com"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-red-500 text-xs block mt-1">{formik.errors.email}</span>
                  )}
                  {checkEmail && <span className="text-red-500 text-xs block mt-1">{checkEmail}</span>}
                </div>

                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-emerald ">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-50 border border-emerald rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-emerald block w-full p-2.5"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <span className="text-red-500 text-xs block mt-1">{formik.errors.password}</span>
                  )}
                  {checkPassword && <span className="text-red-500 text-xs block mt-1">{checkPassword}</span>}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" type="checkbox" className="w-4 h-4 border border-emerald rounded bg-gray-50 focus:ring-3 " />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-emerald">Remember me</label>
                    </div>
                  </div>
                  <Link to="/forgetpassword" className="text-sm font-medium text-emerald hover:underline ">Forgot password?</Link>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white bg-emerald font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Don't have an account yet? <Link to='/signup' className="font-medium text-emerald hover:underline ">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;