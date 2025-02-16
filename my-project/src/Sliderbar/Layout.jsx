import { Outlet } from "react-router-dom";
import Index from "./Index";
export const Layout = ()=>{
return(<>
<Index/>
<Outlet/>
</>)
}
export default Layout;