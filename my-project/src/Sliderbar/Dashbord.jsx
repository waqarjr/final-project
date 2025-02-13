import React, {useCallback,useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export const Dashbord = ()=>{
 
  // const [images, setImages] = useState([]);
  // const inputRef = useRef(); // Added ref

  // const handleImageUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   const imageUrls = files.map((file) => URL.createObjectURL(file));
  //   setImages((prevImages) => [...prevImages, ...imageUrls]);
  //   e.target.value = ""; 
  // };
  // const removeImage = (index) => {
  //   setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  // };

  const [files, setFiles] = useState([]);
  
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prevFiles => [
      ...prevFiles,
      ...acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"]
    }
  });

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  // Cleanup object URLs
  const cleanUp = () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
  };



    return(<> 
       <div className="sm:ml-64 mt-14">
        <p className="text-3xl"> this is a Dashbord</p>
        </div>
        <div className="max-w-7xl p-4">
      {/* Dropzone Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive ? 'Drop the files here' : 'Drag & drop files here, or click to select files'}
        </p>
      </div>

      {/* Preview Area */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((file, index) => (
          <div key={file.name} className="relative group">
            <img
              src={file.preview}
              alt={file.name}
              className="w-full h-32 object-cover rounded-lg border"
            />
            
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* File Count */}
      {files.length > 0 && (
        <div className="mt-4 text-gray-600">
          {files.length} file(s) selected
        </div>
      )}
    </div>
        {/* <div className="p-6 bg-gray-100  flex flex-col items-center">
      <div className="w-full max-w-md">
        <label className="block cursor-pointer" onClick={(e) => e.stopPropagation()} >
          <div className="border-2 border-dashed border-gray-400 rounded-md p-4 text-center text-gray-500 hover:bg-gray-200 transition relative">
            {
              <div className="grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative w-full h-24 border rounded-md overflow-hidden" >
                    <img src={image} alt={`Uploaded ${index}`} className="w-full h-full object-cover" />
                    <button onClick={(e) => {
                        e.stopPropagation(); 
                        removeImage(index);
                         }} className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs transform translate-x-2 -translate-y-2 hover:bg-red-700 transition">&times;</button>
                  </div>
                ))}
              </div>
            }</div>
          <input ref={inputRef}  type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
        </div> */}
</>)
}

export default Dashbord;