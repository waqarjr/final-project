import { Outlet } from "react-router-dom";
import Index from "./Index";
import CategoriesLink from "./categories/CategoriesLink";
export const Layout = ()=>{
return(<>
<Index/>
<CategoriesLink/>
<Outlet/>
</>)
}
export default Layout;