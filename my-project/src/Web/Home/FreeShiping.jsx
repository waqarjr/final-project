import { faLifeRing, faRocket, faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const FreeSiping = ()=>{

return(<>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto py-8">
    <div className="flex items-center bg-white border  hover:border-emerald rounded-md p-4 hover:shadow-sm transition-shadow">
            <FontAwesomeIcon icon={faRocket} className="w-8 h-8 object-contain mr-4 text-emerald " />
        <div>
            <h3 className="text-md font-medium">Free Shiping</h3>
            <p className="text-sm text-gray-500">Order pkr 30,000 or more</p>
        </div>
    </div>
    <div className="flex items-center bg-white border  hover:border-emerald rounded-md p-4 hover:shadow-sm transition-shadow">
            <FontAwesomeIcon icon={faRotateLeft} className="w-8 h-8 object-contain mr-4 text-emerald  " />
        <div>
            <h3 className="text-md font-medium">Free Returns</h3>
            <p className="text-sm text-gray-500">Within 07 days</p>
        </div>
    </div>
    <div className="flex items-center bg-white border  hover:border-emerald rounded-md p-4 hover:shadow-sm transition-shadow">
            <FontAwesomeIcon icon={faLifeRing} className="w-8 h-8 object-contain mr-4 text-emerald " />
        <div>
            <h3 className="text-md font-medium">Free Shiping</h3>
            <p className="text-sm text-gray-500">273 Item Available</p>
        </div>
    </div>
</div>    
</>)
}
export default FreeSiping;