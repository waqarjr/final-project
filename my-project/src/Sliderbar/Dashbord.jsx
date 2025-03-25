import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChartPie, faShip } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Index from './Index';

export const Dashbord = () => {
  
    const [toDate, setToDate] = useState("");

     useEffect(() => {
            const today = new Date();
            const formattedDate = today.toISOString().split("T")[0];
            setToDate(formattedDate);
            document.title = "Dashbord";
        }, []);

  return (<>
  <Index/>
   <div className="sm:ml-64 mt-14">
<div className="p-4">
    <p className="capitalize text-3xl font-sans py-2 ">Dashbord</p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4 ">

    <div className="w-full h-[150px] bg-blue-400 text-white rounded-lg shadow-md flex flex-col group">
    <div className="p-3 flex justify-between items-center">
        <div>
            <p className="font-bold text-white text-2xl md:text-4xl pb-3">3</p>
            <p className="text-white text-1xl md:text-[20px]">Total Orders</p>
        </div>
        <div className=" flex items-center justify-center ">
            <FontAwesomeIcon icon={faShip} className=' text-blue-600 w-[40px] h-[40px] md:w-[70px] md:h-[70px] group-hover:scale-110 group-hover:duration-500 scale-100 transition-transform p-3 ' />
        </div>
        </div>
        <div className="w-full h-8  bg-blue-700 flex justify-center items-center">
            <p className="text-white cursor-pointer">More Info</p> 
            <FontAwesomeIcon icon={faArrowRight} className=' m-2 px-1 bg-white text-blue-300 rounded-full'/>
        </div>
    </div>

    <div className="w-full h-[150px] bg-[#17a2b8] text-white rounded-lg shadow-md flex flex-col group">
    <div className="p-3 flex justify-between items-center">
        <div>
            <p className="font-bold text-white text-2xl md:text-4xl pb-3">3</p>
            <p className="text-white text-1xl md:text-[20px]">Pending Orders</p>
        </div>
        <div className=" flex items-center justify-center ">
            <FontAwesomeIcon icon={faShip} className=' text-[#348491] w-[40px] h-[40px] md:w-[70px] md:h-[70px] group-hover:scale-110 group-hover:duration-500 scale-100 transition-transform p-3 ' />
        </div>
        </div>
        <div className="w-full h-8 bg-[#348491] flex justify-center items-center">
            <p className="text-white cursor-pointer">More Info</p> 
            <FontAwesomeIcon icon={faArrowRight} className=' m-2 px-1 bg-white text-blue-300 rounded-full'/>
        </div>
    </div>
    <div className="w-full h-[150px] bg-[#dc3545] text-white rounded-lg shadow-md flex flex-col group">
    <div className="p-3 flex justify-between items-center">
        <div>
            <p className="font-bold text-white text-2xl md:text-4xl pb-3">3</p>
            <p className="text-white text-1xl md:text-[20px]">Complete</p>
        </div>
        <div className=" flex items-center justify-center ">
            <FontAwesomeIcon icon={faChartPie} className=' text-[#b93542] w-[40px] h-[40px] md:w-[70px] md:h-[70px] group-hover:scale-110 group-hover:duration-500 scale-100 transition-transform p-3 ' />
        </div>
        </div>
        <div className="w-full h-8 bg-[#b93542] flex justify-center items-center">
            <p className="text-white cursor-pointer">More Info</p> 
            <FontAwesomeIcon icon={faArrowRight} className=' m-2 px-1 bg-white text-blue-300 rounded-full'/>
        </div>
    </div>
        
    </div>

    <div className="bg-white w-full  rounded-lg border-2 border-slate-200">
        <div className="grid grid-cols-2 p-4 ">
            <p className="text-2xl ">Total Orders</p>
        </div><hr />
        <div className=" grid md:grid-cols-4 sm:grid-cols-2  grid-cols-1   " >
            <div className="p-2">
                <input type="date"
                 className="w-full border-2 p-1 rounded-md " defaultValue={toDate} id="date" />
            </div>
            <div className="p-2">
                <input type="date" 
                 className="w-full border-2 p-1 rounded-md " defaultValue={toDate} id="date" />
            </div>
            <div className="p-2">
                <select name="" id="" className=" p-[6px] w-full border-2 text-center  rounded-md">
                    <option value="">All</option>
                </select>
            </div>
            <div className="p-2">
                <input type="text"  placeholder="Search" className="w-full border-2 p-[6px]  rounded-md" id="date" />
            </div>
        </div>  

        <div className="p-2">
            <table border="4" className="border-2  w-full text-center rounded-sm">
                <thead className="bg-slate-100 ">
                    <tr className="[&>*]:p-3 [&>*]:border-2 [&>*]:border-gray-300 font-semibold">
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    </div>
</div>
</div>
  </>)
};

export default Dashbord;
