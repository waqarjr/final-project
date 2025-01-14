import { Outlet } from "react-router-dom";
import Index from "./Index";
import CategoriesLink from "./categories/CategoriesLink";
import Link_manufacture from "./Manufacturer/Link_manufacture";
export const Layout = ()=>{
return(<>
<Index/>
<Link_manufacture/>
<CategoriesLink/>
<Outlet/>
</>)
}
export default Layout;