import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";


export const ProductCreat = ()=>{
const navigate = useNavigate();
const [readcategory , setReadCategory ] = useState([]);
const [readManufacturer , setReadManufacturer] = useState([]);

const category = async()=>{
  const data =  await axios.get("http://localhost:4000/readcategory");
  setReadCategory(data.data);
}
const manufacturer = async ()=>{
  const data = await axios.get("http://localhost:4000/readmanufacture");
  setReadManufacturer(data.data);
}
useEffect(()=>{
  category();
  manufacturer();
},[])
// const [images, setImages] = useState([]);
// const handleImageUpload = (e) => {
//   const files = Array.from(e.target.files);
//   const imageUrls = files.map((file) => URL.createObjectURL(file));
//   setImages((prevImages) => [...prevImages, ...imageUrls]);
// };
// const removeImage = (index) => {
//   setImages((prevImages) => prevImages.filter((_, i) => i !== index));
// };

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const FILE_SIZE = 1024 * 1024; 

const validationSchema = Yup.object({
  title:Yup.string().required("Title is required"),
  category:Yup.string().required("Category is required"),
  manufacturer:Yup.string().required('manufacturer is required'),
  price:Yup.number().required('Price is required'),
  price_discount:Yup.number().required('price discount is required'),
  keywords:Yup.string().required("Keywords is required"),
  stock:Yup.number().required('Stock is required'),
  short_description:Yup.string().required('Short Description is required'),
  status:Yup.string().required('Status is required'),
  long_description:Yup.string().required('Long Description is required')
  .min(10, 'Long description must be at least 10 characters'),
  image: Yup.mixed()
    .required("Please upload an image")
    .test("fileSize", "File is too large", (value) => value && value.size <= FILE_SIZE)
    .test("fileFormat", "Unsupported Format", (value) => value && SUPPORTED_FORMATS.includes(value.type)),
  multipleImages: Yup.array().of( Yup.mixed()
    .required("Please upload an image")
    .test("fileSize", "File is too large", (value) => value && value.size <= FILE_SIZE)
    .test("fileFormat", "Unsupported Format", (value) => value && SUPPORTED_FORMATS.includes(value.type))
    ).min(1, "Please upload at least one image")
})

const formik = useFormik({
  initialValues:{
    title : '',
    category : '',
    manufacturer : '',
    price :"",
    price_discount :'',
    keywords :'',
    stock : '',
    image: null,
    multipleImages: [],
    short_description:'',
    long_description:'',
    status:'',
  },
  validationSchema : validationSchema,
  onSubmit : async(values,{resetForm})=>{
    const formData = new FormData();
    formData.append("title", values.title); 
    formData.append("category", values.category); 
    formData.append("manufacturer", values.manufacturer);
    formData.append("price", values.price);
    formData.append("price_discount", values.price_discount);
    formData.append("keywords", values.keywords);
    formData.append("stock", values.stock);
    formData.append("image", values.image);
    formData.append("short_description", values.short_description);
    formData.append("long_description", values.long_description);
    formData.append("status", values.status);

    values.multipleImages.forEach((img) => formData.append("multipleImages", img)); 
    const alpha = await axios.post('http://localhost:4000/creat-product',formData,{
      headers:{
        "Content-Type" : "multipart/form-data"
      }
    })
    if(alpha.data.message){
      Swal.fire({
        title: "Success!",
        text: `${alpha.data.message}`,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
    resetForm();
  }
})


return(<>

<div className="sm:ml-64 mt-14">
    <div className=" p-4">
        <p className="text-3xl capitalize font-sans py-4 " > product categories</p>
    
    <div className="bg-white w-full  rounded-lg border-2 border-slate-200">
        <div className="grid grid-cols-2 p-4 ">
            <p className="text-2xl font-light">Add New</p>
            <div className="justify-self-end">
                <button  onClick={()=>{navigate('/product')}} className="bg-yellow-400 px-3 py-1 text-white border-none hover:bg-blue-700 rounded text-right">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back    
                </button>
            </div>
        </div><hr />

      <form onSubmit={formik.handleSubmit} >
        <div className="grid md:grid-cols-[70%_auto] ">
          <div className="" >
              <div className="m-5 md:m-0 md:ml-5 ">
                  <label htmlFor="title" className="font-bold mt-5 block">Title<span className="text-red-700  ">*</span></label>
                  <input type="text" id="title"  
                  name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="mt-2 h-10 border-2  rounded w-full" />
                  { formik.touched.title && formik.errors.title &&(
                    <span className='text-red-500'>{formik.errors.title}</span>
                  )}
              </div>

              <div className="grid md:grid-cols-2 m-5 md:m-0 md:ml-5 md:space-x-3 ">
                  <div >
                      <label  className="font-bold mt-5 block">Category<span className="text-red-700  ">*</span></label>
                      <select name="category"
                        value={formik.values.category} onBlur={formik.handleBlur} onChange={formik.handleChange}
                        className="mt-2 h-10 border-2 text-center rounded w-full">
                        <option value="" >....Select....</option>
                        {readcategory.map((user,index)=>(
                          <option key={index} value={user._id}>{user.name}</option>
                        ))}
                      </select>
                      {
                        formik.touched.category && formik.errors.category && (
                          <span className='text-rose-500'>{formik.errors.category}</span>
                        )}
                  </div>
                  <div >
                  <label  className="font-bold mt-5 block">Manufacturer<span className="text-red-700  ">*</span></label>
                      <select name="manufacturer" 
                          onChange={formik.handleChange} onBlur={formik.handleBlur} defaultValue={formik.values.manufacturer}
                          className="mt-2 text-center h-10 border-2 rounded w-full">
                          <option value="" >....Select....</option>
                          {readManufacturer.map((user,index)=>(
                            <option key={index} value={user._id}>{user.name}</option>
                        ))}
                      </select>
                      { formik.touched.manufacturer && formik.errors.manufacturer && (
                        <span className='text-red-500'>{formik.errors.manufacturer}</span>
                      )}
                  </div>
              </div>
              <div className="grid md:grid-cols-2 m-5 md:m-0 md:ml-5 md:space-x-3 ">
                  <div>
                      <label htmlFor="price" className="font-bold mt-5 block">Price<span className="text-red-700  ">*</span></label>
                      <input type="number" id="price" name='price' 
                      value={formik.values.price} onBlur={formik.handleBlur} onChange={formik.handleChange} 
                      className="mt-2 h-10 border-2  rounded w-full" />
                      {formik.touched.price && formik.errors.price && (
                        <span className='text-red-500' >{formik.errors.price}</span>
                      )}
                  </div>
                  <div >
                      <label htmlFor="price_discount" className="font-bold mt-5 block">Price Discount<span className="text-red-700">*</span></label>
                      <input type="number" id="price_discount" name='price_discount'
                      value={formik.values.price_discount} onChange={formik.handleChange} onBlur={formik.handleBlur}
                      className="mt-2 h-10 border-2  rounded w-full" />
                      {formik.touched.price_discount && formik.errors.price_discount && (
                        <span className='text-rose-500'>{formik.errors.price_discount}</span>
                      )}
                  </div>
              </div>
              <div className="grid md:grid-cols-2 m-5 md:m-0 md:ml-5 md:space-x-3">
                  <div >
                      <label htmlFor="keywords" className="font-bold mt-5 block">Keywords<span className="text-red-700">*</span></label>
                      <input type="text" id="keywords" name='keywords'
                      value={formik.values.keywords} onBlur={formik.handleBlur} onChange={formik.handleChange}
                      className="mt-2 h-10 border-2  rounded w-full" />
                      {formik.touched.keywords && formik.errors.keywords && (
                        <span className='text-rose-500'>{formik.errors.keywords}</span>
                      )}
                  </div>
                  <div >
                      <label htmlFor="stock" className="font-bold mt-5 block">Stock<span className="text-red-700">*</span></label>
                      <input type="number" id="stock" name='stock' 
                      value={formik.values.stock} onBlur={formik.handleBlur} onChange={formik.handleChange}
                      className="mt-2 h-10 border-2  rounded w-full" />
                      {formik.touched.stock && formik.errors.stock && (
                        <span className='text-rose-500'>{formik.errors.stock}</span>
                      )}
                  </div>
              </div>
          </div>

          <div>
          <div className='mt-6 mx-3'>
              {/* <div className="w-full bg-gray-100">
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-400 rounded-md p-4 text-center text-gray-500 hover:bg-gray-200 transition">
                    Click to Upload Images
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative w-full h-24 border rounded-md overflow-hidden" >
                      <img src={image} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
                      <button onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs transform translate-x-2 -translate-y-2 hover:bg-red-700 transition">&times;
                      </button>
                    </div>
                  ))}
                </div>
                  </div>
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div> */}
               <label className="font-bold  block">Single Images<span className="text-red-700">*</span></label>
              <input type="file" name="image" 
              className='border-2 border-black mt-2   rounded-lg'
              onChange={(event) => formik.setFieldValue("image",event.currentTarget.files[0])} />
              
              {formik.touched.image && formik.errors.image && (
                  <div className="text-red-500">{formik.errors.image}</div>
              )}
          </div>
            <div className="mt-6 mx-3 ">
              <label className="font-bold  block">Multiple Images<span className="text-red-700">*</span></label>
              <input type="file" name="multipleImages" multiple 
              className='border-2 border-black mt-2   rounded-lg'
              onChange={(event) => formik.setFieldValue("multipleImages", Array.from(event.currentTarget.files))} />
              {formik.touched.multipleImages && formik.errors.multipleImages && (
                <div className="text-red-500">{formik.errors.multipleImages}</div>
              )}
            </div>

          </div>

      </div>
        
        <div className="mx-5 mt-4">
            <label htmlFor="short_description" className="font-bold">Short Description<span className="text-red-700">*</span> </label>
            <textarea name="short_description" id="short_description" 
            value={formik.values.short_description} onChange={formik.handleChange} onBlur={formik.handleBlur}
            className="w-full border-2"></textarea>
            {formik.touched.short_description && formik.errors.short_description && (
              <span className='text-red-500' >{formik.errors.short_description}</span>
            )}
        </div>   

       <div className='mx-5 mt-4 '>
            <label htmlFor="long_description" className="font-bold">Long Description<span className="text-red-700">*</span> </label>
            <CKEditor editor={ClassicEditor}
          config={{ licenseKey: 'YOUR_LICENSE_KEY_HERE',  }} data={formik.values.long_description}
          onChange={(event, editor) => { const data = editor.getData(); formik.setFieldValue('long_description', data); }}
          onBlur={() => formik.setFieldTouched('long_description', true)}/>
          {formik.touched.long_description && formik.errors.long_description && (
          <span className="text-rose-500">{formik.errors.long_description}</span>
        )}
       </div>

        <div className="ml-5 my-2">
            <p className="font-bold">Status <span className="text-rose-700">*</span></p>
            <div className="[&>*]:mr-2 mt-2">
                <label htmlFor="disable">Disable</label>
                <input type="radio" name="status" id="disable" value="disable" 
                checked={formik.values.status  === "disable" } onChange={formik.handleChange} />
                <label htmlFor="enable">Enable</label>
                <input type="radio" name="status" id="enable" value="enable" 
                checked={formik.values.status  === "enable"} onChange={formik.handleChange} /><br/>
                {formik.touched.status && formik.errors.status &&(
                    <span className="text-red-500">{formik.errors.status }</span>
                )}
            </div> 
        </div>

        <div className=" bg-slate-200 p-4  ">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded py-1 px-3 text-white ">
                Submit
            </button>
        </div>

      </form>        
    </div>
    </div>
</div>
</>)
}
export default ProductCreat;