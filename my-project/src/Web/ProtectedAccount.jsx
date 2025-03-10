import { NavLink } from "react-router-dom";

export const ProtecedRouter = ({children})=>{
const signaccount = localStorage.getItem('isSigup');

return signaccount ? children:<NavLink to="/signin" replace />; 

}
export default ProtecedRouter;