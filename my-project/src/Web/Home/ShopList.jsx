import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronDown, faChevronUp, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


export const ShopList = ()=>{

const [categories,setCategories] = useState(false);
const [products , setProducts ] = useState(false);
return(<>
    <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-[25%_auto] gap-6 ">
            <h3>Filters</h3><hr />
        <div >
            <div className='my-3' >
                <ul>
                    <li className='flex items-center justify-between my-6 hover:cursor-pointer ' onClick={()=>{setCategories(!categories)}} > 
                        <p className='font font-xl font-semibold' >Categories</p>
                        <FontAwesomeIcon icon={categories ? faChevronUp : faChevronDown} />
                    </li>
                    <ul className={`   ${categories ? "" : "hidden "}`} >
                        <li className='flex items-center justify-between my-4'>
                        <label><input type="checkbox" />
                            <span className='mx-2' >Computer</span> 
                        </label>
                        <div className='bg-slate-200 px-1 rounded '>23</div>
                        </li>
                        <li className='flex items-center justify-between my-4'>
                        <label><input type="checkbox" />
                            <span className='mx-2' >Laptop</span> 
                        </label>
                        <div className='bg-slate-200 px-1 rounded '>3</div>
                        </li>
                        <li className='flex items-center justify-between my-4'>
                        <label><input type="checkbox" />
                            <span className='mx-2' >Mouse</span> 
                        </label>
                        <div className='bg-slate-200 px-1 rounded '>19</div>
                        </li>
                    </ul>
                </ul>
            </div><hr />
            <div className='my-5' >
            <ul>
                <li className='flex items-center justify-between my-6 hover:cursor-pointer ' onClick={()=>{setProducts(!products)}} > 
                    <p className='font font-xl font-semibold' >Products</p>
                    <FontAwesomeIcon icon={products ? faChevronUp : faChevronDown} />
                </li>
                <ul className={`   ${products ? "" : "hidden "}`} >
                    <li className='flex items-center justify-between my-4'>
                    <label><input type="checkbox" />
                        <span className='mx-2' >Computer</span> 
                    </label>
                    <div className='bg-slate-200 px-1 rounded '>23</div>
                    </li>
                    <li className='flex items-center justify-between my-4'>
                    <label><input type="checkbox" />
                        <span className='mx-2' >Laptop</span> 
                    </label>
                    <div className='bg-slate-200 px-1 rounded '>3</div>
                    </li>
                    <li className='flex items-center justify-between my-4'>
                    <label><input type="checkbox" />
                        <span className='mx-2' >Mouse</span> 
                    </label>
                    <div className='bg-slate-200 px-1 rounded '>19</div>
                    </li>
                </ul>
                </ul>
            </div>
        </div>
        <div>
           <div className='grid grid-cols-[20%_50%_30%]' >
            <img src="../../../public/1738995002435-laptop.png" alt="" className='w-[200px]' />
            <div className=''  >
                <div className='flex justify-between'>
                    <p>Lenovo Think Vision L197 Widescreen 19 inch Monito</p>
                    <button className="  rounded-full w-8 h-8 flex items-center justify-center  hover:shadow group ">
                        <FontAwesomeIcon icon={faHeart} className="h-5 w-5 text-emerald" />
                </button>
                </div>
                <p className='my-3' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur cumque ullam, molestiae error suscipit vel. Quod quos minus, iure dignissimos rem aspernatur repellat error eius. Nulla, sunt. Odit, illo nostrum.</p>
            </div>
            <div className='mx-auto my-auto ' >
                <p className='' >Pkr 12,000</p>
                <FontAwesomeIcon icon={faStar} className='my-2 ' /><br />
                <button className="bg-green-800 px-3 py-2 text-white hover:bg-green-700 transition-colors  ">
                Buy Now
              </button>
            </div>
        </div> <hr />
           <div className='grid grid-cols-[20%_50%_30%]' >
            <img src="../../../public/1738995002435-laptop.png" alt="" className='w-[200px]' />
            <div className=''  >
                <div className='flex justify-between'>
                    <p>Lenovo Think Vision L197 Widescreen 19 inch Monito</p>
                    <button className="  rounded-full w-8 h-8 flex items-center justify-center  hover:shadow group ">
                                                <FontAwesomeIcon icon={faHeart} className="h-5 w-5 group-hover:text-emerald" />
                                        </button>
                </div>
                <p className='my-3' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur cumque ullam, molestiae error suscipit vel. Quod quos minus, iure dignissimos rem aspernatur repellat error eius. Nulla, sunt. Odit, illo nostrum.</p>
            </div>
            <div className='mx-auto my-auto ' >
                <p className='' >Pkr 12,000</p>
                <FontAwesomeIcon icon={faStar} className='my-2 ' /><br />
                <button className="bg-green-800 px-3 py-2 text-white hover:bg-green-700 transition-colors  ">
                Buy Now
              </button>
            </div>
        </div> 
        </div>
        
    </div>  
    </div>
</>)

}
export default ShopList;