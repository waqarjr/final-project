export const ProductCreat = ()=>{

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
                    <input type="text" id="stock" className="mt-2 h-10 border-2  rounded w-full" />
                </div>
            </div>
        </div>
        <div className="mt-5 ml-1">
            <label htmlFor="image" className="font-bold">Image <span className="text-red-700 " >*</span> </label>
           <input type="file" className="w-full border-2 rounded-md mt-2"  />

            <div className="mt-8">
           <label htmlFor="image" className="font-bold">Multiple Images <span className="text-red-700 " >*</span> </label>
           <input type="file" multiple className="w-full border-2 rounded-md mt-2"  />
            </div>

        </div>
        </div>
        
        <div className="mx-5 mt-4">
            <label htmlFor="short_description" className="font-bold">Short Description<span className="text-red-700">*</span> </label>
            <textarea name="short_description" id="short_description" className="w-full border-2"></textarea>
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