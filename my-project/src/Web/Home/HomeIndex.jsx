import { useEffect } from "react";
import Brands from "./Brands";
import Carousel from "./Carousel";
import FreeSiping from "./FreeShiping";
import PopularCategories from "./PopularCategories";
import  ProductsCarousel from "./ProductsCarousel";
import Recomanded from "./Recomanded";

export const HomeIndex = ()=>{

useEffect(()=>{
    document.title = "Home";
},[])

return(<>
<Carousel/>
<PopularCategories/>
<ProductsCarousel/>
<Brands/>
<Recomanded/>
<FreeSiping/>
</>)

}
export default HomeIndex;