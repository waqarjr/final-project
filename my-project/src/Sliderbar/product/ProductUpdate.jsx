import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback,useEffect, useState } from 'react';
import axios from "axios";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import Index from '../Index';

export const ProductUpdate = ()=>{
const navigate = useNavigate();
const {id} = useParams();

const [title , setTitle] = useState('');
const [category , setCategories] = useState('');
const [manufacturer , setManufacturer] = useState('');
const [price , setPrice] = useState ('');
const [price_discount , setPrice_Discount] = useState('');
const [keywords , setKeywords] = useState('');
const [stock , setStock ] = useState('');
const [short_description , setShort_Description] = useState('');
const [long_description , setLong_Description] = useState('');
const [status ,SetStatus] = useState('');

const [readcategory , setReadCategory ] = useState([]);
const [readManufacturer , setReadManufacturer] = useState([]);

const [singleImage, setSingleImage] = useState(null);
const [multipleImages, setMultipleImages] = useState([]);



const category_read = async()=>{
  const data =  await axios.get("http://localhost:4000/readcategory");
  setReadCategory(data.data);
}
const manufacturer_read = async ()=>{
  const data = await axios.get("http://localhost:4000/readmanufacture");
  setReadManufacturer(data.data);
}
useEffect(()=>{
  category_read();
  manufacturer_read();
  document.title = "Product Update";
},[])

const fetchData = async(id)=>{
    const data = await axios.get(`http://localhost:4000/read-update-product/${id}`)
    setTitle(data.data.title);
    setCategories(data.data.category);
    setManufacturer(data.data.manufacturer);
    setPrice(data.data.price);
    setPrice_Discount(data.data.price_discount);
    setKeywords(data.data.keywords);
    setStock(data.data.stock);
    setShort_Description(data.data.short_description);
    setLong_Description(data.data.long_description);
    SetStatus(data.data.status);
    const imageUrl = data.data.image;
  setSingleImage({ preview: imageUrl});
  formik.setFieldValue("image", imageUrl);
}

const multiple = async (id) => {
  const response = await axios.get(`http://localhost:4000/read-mul-image-product/${id}`);

  const images = response.data.map((img) => ({ preview: img,  name: "Fetched Image"}));
  setMultipleImages(images);
  formik.setFieldValue("multipleImages", images);
};
                                                                            
useEffect(()=>{
multiple(id);
fetchData(id)
},[id])


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
  multipleImages: Yup.array().of( Yup.mixed()
    .required("Please upload an image")
    ).min(1, "Please upload at least one image")
})

const formik = useFormik({
  initialValues:{
    title : title,
    category : category,
    manufacturer : manufacturer,
    price :price,
    price_discount :price_discount,
    keywords :keywords,
    stock : stock,
    short_description:short_description,
    long_description:long_description,
    status:status,
    multipleImages: multipleImages,
  },
  enableReinitialize: true,
  validationSchema : validationSchema,
  onSubmit : async(values)=>{
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
    values.multipleImages.map((img) => formData.append("multipleImages", img)); 

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
      }).then(async(result) => {
      if (result.isConfirmed) {
        await axios.post(`http://localhost:4000/update-product/${id}`,formData,{
          headers:{
            "Content-Type" : "multipart/form-data"
          }
        })
          Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
      }
      });
  }
})

const onDropSingle = useCallback((acceptedFiles) => {
  if (acceptedFiles.length > 0) {
    const selectedFile = acceptedFiles[0];
    setSingleImage(Object.assign(selectedFile, { preview: URL.createObjectURL(selectedFile) }));
    formik.setFieldValue("image", selectedFile, false);
  }
}, [formik]);

const { getRootProps: getRootPropsSingle, getInputProps: getInputPropsSingle } = useDropzone({
  onDrop: onDropSingle,
  accept: { "image/*": [] },
  multiple: false,
});


const onDropMultiple = useCallback((acceptedFiles) => {
  const filesWithPreview = acceptedFiles.map((file) =>
    Object.assign(file, { preview: URL.createObjectURL(file) })
  );

  setMultipleImages((prevFiles) => [...prevFiles, ...filesWithPreview]);
  formik.setFieldValue("multipleImages", (prev) => [...prev, ...filesWithPreview]);
}, [formik]);

const { getRootProps: getRootPropsMul, getInputProps: getInputPropsMul } = useDropzone({
  onDrop: onDropMultiple,
  accept: { "image/*": [] },
  multiple: true,
});

const deleteMulFilePreview = async (file,id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then( async (result) => {
    if (result.isConfirmed) {
      setMultipleImages((prevFiles) => prevFiles.filter((f) => f !== file));
      URL.revokeObjectURL(file.preview);
    await axios.get(`http://localhost:4000/del-mul-image-product/${id}`)
    Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
};


return(<>
<Index/>
<div className="sm:ml-64 mt-14">
    <div className=" p-4">
        <p className="text-3xl capitalize font-sans py-4" > product categories</p>
    
    <div className="bg-white w-full  rounded-lg border-2 border-slate-200 ">
        <div className="grid grid-cols-2 p-4 ">
            <p className="text-2xl font-light">Add New</p>
            <div className="justify-self-end">
                <button  onClick={()=>{navigate('/admin/product')}} className="bg-yellow-400 px-3 py-1 text-white border-none hover:bg-yellow-500 rounded text-right">
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Back    
                </button>
            </div>
        </div><hr />

      <form onSubmit={formik.handleSubmit} >
        <div className="grid  grid-cols-1 md:grid-cols-[70%_auto] ">
          <div className="" >

              <div className="m-5 md:m-0 md:ml-5">
                  <label htmlFor="title" className="font-bold mt-5 block">Title<span className="text-red-700  ">*</span></label>
                  <input type="text" id="title"  
                  name="title" value={formik.values.title} onChange={formik.handleChange} onBlur={formik.handleBlur}
                  className="mt-2 h-10 border-2  rounded w-full" />
                  { formik.touched.title && formik.errors.title &&(
                    <span className='text-red-500'>{formik.errors.title}</span>
                  )}
              </div>

              <div className="grid md:grid-cols-2 m-5 md:m-0 md:ml-5 md:space-x-3">
                  <div >
                      <label  className="font-bold mt-5 block">Category<span className="text-red-700  ">*</span></label>
                      <select name="category"
                        value={formik.values.category} onBlur={formik.handleBlur} onChange={formik.handleChange}
                        className="mt-2 h-10 border-2  rounded w-full">
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
                          onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.manufacturer}
                          className="mt-2 h-10 border-2 rounded w-full">
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
              <div className="grid md:grid-cols-2 m-5 md:m-0 md:ml-5 md:space-x-3">
                  <div >
                  <label htmlFor="price" className="font-bold mt-5 block">Price<span className="text-red-700  ">*</span></label>
                      <input type="number" id="price" name='price' 
                      value={formik.values.price} onBlur={formik.handleBlur} onChange={formik.handleChange} 
                      className="mt-2 h-10 border-2  rounded w-full" />
                      {formik.touched.price && formik.errors.price && (
                        <span className='text-red-500' >{formik.errors.price}</span>
                      )}
                  </div>
                  <div>
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

            <div className='mt-1 md:mt-6 mx-3'>
                <label className="font-bold  block">Single Images<span className="text-red-700">*</span></label>

                <div className=" w-full">
                    <div {...getRootPropsSingle()}
                      className="border-2 border-dashed border-blue-500 p-6 text-center cursor-pointer mb-6 flex items-center justify-center min-h-[150px]">
                      <input {...getInputPropsSingle()} />
                      {!singleImage && <p>Drag & drop an image here, or click to select one</p>}
                      {singleImage && (
                        <div className="relative inline-block m-2 rounded  group">
                          <img src={singleImage.preview} alt={singleImage.name} className="w-24 " id='image' 
                          name='image'  />
                        </div>
                      )}
                    </div>
                  </div>
                  {formik.touched.image && formik.errors.image && (
                    <div className="text-red-500">{formik.errors.image}</div>
                )} 
            </div>

            <div className="mt-6 mx-3 ">
              <label className="font-bold  block">Multiple Images<span className="text-red-700">*</span></label>

              <div {...getRootPropsMul()}
                    className="border-2 border-dashed border-blue-500 text-center cursor-pointer min-h-[150px]  ">
                    <input {...getInputPropsMul()} />
                    {multipleImages.length === 0 && <p>Drag & drop some images here, or click to select multiple images</p>}
                    {multipleImages.map((file, index) => (
                      <div key={index} className="relative inline-block m-2  group">
                        <img src={typeof file.preview === "string" ? file.preview : file.preview?.images} 
                        alt={file.name} className="w-24 " id='multipleImages'
                        name="multipleImages" onChange={(event) => formik.setFieldValue("multipleImages", Array.from(event.currentTarget.files))} />
                        <button type='button' onClick={(e) => { e.stopPropagation(); deleteMulFilePreview(file ,file.preview._id); }}
                          className="hover:cursor-pointer absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 text-white text-2xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded">
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  {formik.touched.multipleImages && formik.errors.multipleImages && (
                  <div className="text-red-500">{formik.errors.multipleImages}</div>
                )}    
            </div> 

          </div>

        </div>
        
        <div className="mx-5 mt-4 md:mt-0 ">
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
            <div className="[&>*]:p-2 mt-3">
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

        <div className="bg-slate-200 p-4 ">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded py-1 px-3 text-white ">
                Update
            </button>
        </div>

      </form>        
    </div>
    </div>
</div>
</>)
}
export default ProductUpdate;