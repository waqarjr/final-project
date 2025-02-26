import { useEffect, useState } from "react";
import axios from "axios";
export const PopularCategories = ()=>{

const [data , setData ] = useState([]);

const read_data = async()=>{
    const data = await axios.post("http://localhost:4000/readcategory");
    setData(data.data);
}
useEffect(()=>{
read_data();
},[])

return(<>

<section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">Popular Categories</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((values,index) => (
          <div  key={index} className="flex items-center bg-white border  border-emerald rounded-md p-4 hover:shadow-md transition-shadow">
            <img  src={values.image}  alt={values.name} className="w-14 h-14 object-contain mr-4" />
            <div>
              <h3 className="text-lg font-medium">{values.name}</h3>
              <p className="text-sm text-gray-500">273 Item Available</p>
            </div>
          </div>
        ))}
      </div>
    </section>
</>)
 }
 export default PopularCategories;