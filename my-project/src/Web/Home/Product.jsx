import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faMinus, faPlus, faRotateLeft, faStar, faTruck} from '@fortawesome/free-solid-svg-icons';

export const Product = ()=>{

return(<>

<div className="min-h-screen bg-white p-6 md:p-12">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-12 lg:grid-cols-2  ">   
          <div className="space-y-4  ">
            <div className="relative  overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center ">
              <img src="../../../public/1738995109366-computer.jpg" className=" w-[400px] object-contain p-4"/>
            </div>
            <div className="grid grid-cols-4 gap-4 ">
                <button className="relative   overflow-hidden rounded-lg border border-black bg-gray-100 hover:border-gray-900">
                  <img src="../../../public/1738995109366-computer.jpg" className="h-full w-full object-contain  " />
                </button>
            </div>
          </div>

          <div className="space-y-8 ">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Airpods Max</h1>
              <p className="text-gray-500">
                A perfect balance of high-fidelity audio with the effortless magic of Airpods.
              </p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i}  icon={faStar} className="fa-solid fa-star text-lg text-emerald " />
                ))}
                <span className="ml-2 text-sm text-gray-500">(121)</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-gray-900">$549.00</span>
                <span className="text-sm text-gray-500">or 99.99/month</span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center rounded-md border border-black">
                <button className="px-3 py-2 hover:bg-gray-100">
                  <FontAwesomeIcon icon={faMinus} className='text-sm' />
                </button>
                <span className="w-12 text-center">1</span>
                <button className="px-3 py-2 hover:bg-gray-100">
                    <FontAwesomeIcon icon={faPlus} className='text-sm' />
                </button>
              </div>
              <span className="text-sm text-orange-500">Only 7 items Left!</span>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 rounded-full bg-emerald px-4 py-3 text-white hover:bg-[#3ac6a1] transition-colors">
                Buy Now
              </button>
              <button className="flex-1 rounded-full border border-black px-4 py-3 text-gray-900 hover:border-gray-100 hover:bg-gray-100 transition-colors">
                Add to Cart
              </button>
            </div>

            <div className="space-y-4 rounded-lg border border-black p-4 ">
              <div className="flex items-center space-x-4  ">
                <FontAwesomeIcon icon={faTruck} />
                <div>
                  <p className="font-medium text-gray-900  ">Free Delivery</p>
                  <p className="text-sm text-gray-500">Enter your Postal code for Delivery Availability</p>
                </div>
              </div><hr className='border-black ' />
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon icon={faRotateLeft} />
                <div>
                  <p className="font-medium text-gray-900">Return Delivery</p>
                  <p className="text-sm text-gray-500">
                    Free 30 Days Delivery Returns. <span className="cursor-pointer underline">Details</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> <hr />
    <div className='my-10  ' >
      <div className='text-center my-5 ' >
           <span className='p-4 hover:text-emerald  hover:border-b hover:border-emerald transition-colors duration-100 cursor-pointer'>Long Description</span> |     
           <span className='p-4 hover:text-emerald  hover:border-b hover:border-emerald transition-colors duration-100 cursor-pointer' > Reviews</span>     
      </div>
      <div className='' >
        <h3>this is a heading threee</h3>
      </div>
      <div  className='' >
        <h2>this is a heading 2 </h2>
      </div>
    </div>            

</>)

}
export default Product;