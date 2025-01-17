import { useCallback } from "react";
import {useDropzone} from "react-dropzone"

export const Dashbord = ()=>{

    const {getRootProps, getInputProps,isDragActive} = useDropzone({
        onDrop: useCallback(()=>{
            console.log(files);
        },[]) 
    });

    return(<> 
       <div className="sm:ml-64 mt-14">
        <p className="text-3xl"> this is a Dashbord</p>
        </div>
        <div {...getRootProps()} className=" flex justify-center items-center rounded mt-7 h-20 bg-gray-100 hover:bg-gray-200 max-w-md mx-auto  border-2 border-dashed border-gray-500 " >
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the file here...</p> : <p>Drop 'n number of file here or Click here to select files</p> }
        </div>
</>)
}

export default Dashbord;