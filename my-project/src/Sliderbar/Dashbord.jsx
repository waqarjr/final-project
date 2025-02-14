import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export const Dashbord = () => {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const filesWithPreview = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setFiles((prevFiles) => [...prevFiles, ...filesWithPreview]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const uploadFiles = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files[]", file);
    });

    try {
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Files uploaded successfully:", response.data);
      setUploadedFiles([...uploadedFiles, ...files]);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const deleteFilePreview = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f !== file));
    URL.revokeObjectURL(file.preview);
  };

  const deleteFile = async (filename) => {
    try {
      await axios.delete(`http://localhost:3000/files/${filename}`);
      setUploadedFiles(uploadedFiles.filter((file) => file.name !== filename));
      console.log("File deleted successfully:", filename);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">React Dropzone Example</h1>
      
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-500 p-6 text-center cursor-pointer mb-6 flex flex-wrap gap-3 min-h-[150px] items-center justify-center"
      >
        <input {...getInputProps()} />
        {files.length === 0 && <p>Drag & drop some images here, or click to select files</p>}
        {files.map((file, index) => (
          <div key={index} className="relative w-24 h-24">
            <img src={file.preview} alt={file.name} className="w-full h-full object-cover rounded-lg" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFilePreview(file);
              }}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1"
            >
              X
            </button>
          </div>
        ))}
      </div>
      
      <button 
        onClick={uploadFiles} 
        disabled={files.length === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
      >
        Upload Files
      </button>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Uploaded Files:</h2>
        <div className="flex flex-wrap gap-3">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="relative w-24 h-24">
              <img
                src={`http://localhost:3000/uploads/${file.name}`}
                alt={file.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => deleteFile(file.name)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
