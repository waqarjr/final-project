import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const ProductCreat = ()=>{
const navigate = useNavigate();

const [singleImage, setSingleImage] = useState(null);
  const [multipleImages, setMultipleImages] = useState([]);

  const handleSingleDrop = (files) => {
    const validFile = files.find((file) =>
      ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    );
    if (validFile) {
      setSingleImage(
        Object.assign(validFile, {
          preview: URL.createObjectURL(validFile),
        })
      );
    } else {
      alert('Invalid file type. Please upload a valid image.');
    }
  };

  const handleMultipleDrop = (files) => {
    const validFiles = files.filter((file) =>
      ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)
    );
    const previews = validFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setMultipleImages((prevImages) => [...prevImages, ...previews]);
  };

  const singleDropzone = useDropzone({
    onDrop: handleSingleDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
    },
    multiple: false,
  });

  const multipleDropzone = useDropzone({
    onDrop: handleMultipleDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
    },
    multiple: true,
  });

  const removeSingleImage = () => setSingleImage(null);
  const removeMultipleImage = (fileName) => {
    setMultipleImages((prevImages) =>
      prevImages.filter((file) => file.name !== fileName)
    );
  };



return(<>

<div className="sm:ml-64 mt-14">
    <div className=" p-4">
        <p className="text-3xl capitalize font-sans " > product categories</p>
    </div>
    <div className="max-w-7xl   bg-white shadow-sm mx-3 rounded-md ">
        <div className="grid grid-cols-2 p-4 ">
            <p className="text-2xl font-light">Add New</p>
            <div className="justify-self-end">
                <button  onClick={()=>{navigate('/product')}} className="bg-yellow-400 px-3 py-1 text-white border-none hover:bg-blue-700 rounded text-right">
                    Back    
                </button>
            </div>
        </div><hr />

        <div className="grid grid-cols-[70%_auto] ">
        <div className="grid grid-cols-1" >
            <div className="ml-5 ">
                <label htmlFor="title" className="font-bold mt-5 block">Title<span className="text-red-700  ">*</span></label>
                <input type="text" id="title" className="mt-2 h-10 border-2  rounded w-full" />
            </div>

            <div className="grid grid-cols-2 ml-5 space-x-3 ">
                <div >
                    <label  className="font-bold mt-5 block">Category<span className="text-red-700  ">*</span></label>
                    <select name="category"  className="mt-2 h-10 border-2  rounded w-full">
                        <option value="" >....Select....</option>
                        <option value="laptop">Laptop</option>
                        <option value="computer">Computer</option>
                        <option value="lcd">LCD</option>
                        <option value="speaker">Speaker</option>
                        <option value="printer">Printer</option>
                        <option value="Mouse">Mouse</option>
                    </select>
                </div>
                <div >
                <label  className="font-bold mt-5 block">Manufacturer<span className="text-red-700  ">*</span></label>
                    <select name="manufacturer"  className="mt-2 h-10 border-2  rounded w-full">
                        <option value="" >....Select....</option>
                        <option value="dell">Dell</option>
                        <option value="lenovo">Lenovo</option>
                        <option value="apple">Apple</option>
                        <option value="hp">HP</option>
                        <option value="samsong">Samsong</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-2 ml-5 space-x-3 ">
                <div >
                <label  className="font-bold mt-5 block">Vendor<span className="text-red-700  ">*</span></label>
                    <select name="vendor"  className="mt-2 h-10 border-2  rounded w-full">
                        <option value="" >....Select....</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div >
                    <label htmlFor="price" className="font-bold mt-5 block">Price<span className="text-red-700  ">*</span></label>
                    <input type="number" id="price" className="mt-2 h-10 border-2  rounded w-full" />
                </div>
            </div>
            <div className="grid grid-cols-2 ml-5 space-x-3 ">
                <div >
                    <label htmlFor="price_discount" className="font-bold mt-5 block">Price Discount</label>
                    <input type="number" id="price_discount" className="mt-2 h-10 border-2  rounded w-full" />
                </div>
                <div >
                    <label htmlFor="keywords" className="font-bold mt-5 block">Keywords</label>
                    <input type="text" id="keywords" className="mt-2 h-10 border-2  rounded w-full" />
                </div>
            </div>
            <div className="grid grid-cols-2 ml-5 space-x-3 ">
                <div >
                    <label htmlFor="stock" className="font-bold mt-5 block">Stock</label>
                    <input type="text" id="stock" className="mt-2 h-12 border-2  rounded w-full" />
                </div>
            </div>
        </div>
      <div className="">

      <div
  {...singleDropzone.getRootProps()}
  className="relative flex flex-col items-center justify-center mt-11 mx-4 w-auto h-[150px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-100  transition cursor-pointer"
>
  <input {...singleDropzone.getInputProps()} />
  {singleImage ? (
    <div className="relative flex flex-col items-center  size-20 justify-center">
      <img src={singleImage.preview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />
      <button
        onClick={removeSingleImage}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-red-500 rounded-full size-8 opacity-0 hover:opacity-100 transition" >
        <span className="text-xl">×</span> 
      </button>
    </div>
  ) : (
    <img
      src="../../../public/camera-icon.jpg"
      alt="Upload Logo"
      className="w-16 h-16 object-contain opacity-80 hover:opacity-100 transition"
    />
  )}
</div>


{/* Multiple IMages */}

<div
  {...multipleDropzone.getRootProps()}
  className="flex flex-col items-center justify-center mx-5 mt-5 w-auto h-[180px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-100 transition cursor-pointer overflow-hidden"
>
  <input {...multipleDropzone.getInputProps()} />
  {multipleImages.length > 0 ? (
    multipleImages.map((file) => (
      <div key={file.name} className="relative flex flex-col items-center  size-20 justify-center overflow-hidden">
        <img
          src={file.preview}
          alt="Preview"
          className="w-[100px] object-contain rounded-md"
        />
          <button
          onClick={() => removeMultipleImage(file.name)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white bg-red-500 rounded-full size-8 opacity-0 hover:opacity-100 transition" >
        <span className="text-xl">×</span> 
      </button>
      </div>
    ))
  ) : (
    <img
      src="../../../public/camera-icon.jpg"
      alt="Upload Logo"
      className="w-16 h-16 object-contain opacity-80 hover:opacity-100 transition"
    />
  )}
</div>


      </div>
        </div>
        
        <div className="mx-5 mt-4">
            <label htmlFor="short_description" className="font-bold">Short Description<span className="text-red-700">*</span> </label>
            <textarea name="short_description" id="short_description" className="w-full border-2"></textarea>
        </div>   

       <div className='mx-5 mt-4 '>
       <CKEditor  editor={ClassicEditor} config={{ licenseKey: 'YOUR_LICENSE_KEY_HERE', }} data=""
            // onReady={(editor) => {
            //     console.log('Editor is ready to use!', editor);
            // }}
        />
       </div>
        <div className="ml-5">
            <p className="font-bold">Status </p>
            <div className="[&>*]:p-2 mt-3">
                <label htmlFor="disable">Disable</label>
                <input type="radio" name="status" id="disable" value="disable" />
                <label htmlFor="enable">Enalble</label>
                <input type="radio" name="status" id="enable" value="enable" /><br/>   
            </div>   
        <label > 
            <input type="checkbox" name="" id="" className="mt-3" /> Feature Product  
        </label>
        </div>

        <div className="mx-2 bg-slate-200 p-4 rounded-lg ">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 rounded py-1 px-3">
                Submit
            </button>
        </div>

    </div>
</div>
</>)
}
export default ProductCreat;