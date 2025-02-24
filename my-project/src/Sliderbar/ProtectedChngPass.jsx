import { Navigate } from "react-router-dom"; 
export const ProtectChanPass = ({children})=>{

const isAuthenticated = se.getItem("changepassword"); 

return isAuthenticated ? children : <Navigate to="admin/conformpassword" replace />;

} 

export default ProtectChanPass;