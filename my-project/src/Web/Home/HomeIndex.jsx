import Brands from "./Brands";
import Carousel from "./Carousel";
import ContactUs from "./ContactUs";
import FreeSiping from "./FreeShiping";
import PopularCategories from "./PopularCategories";
import Product from "./Product";
import  ProductsCarousel from "./ProductsCarousel";
import Recomanded from "./Recomanded";
import ShopList from "./ShopList";

export const HomeIndex = ()=>{

return(<>
<Carousel/>
<PopularCategories/>
<ProductsCarousel/>
{/* <Product/> */}
{/* <ShopList/> */}
<Brands/>
<Recomanded/>
<FreeSiping/>
{/* <ContactUs/> */}
</>)

}
export default HomeIndex;