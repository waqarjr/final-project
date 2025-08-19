export const ProtextedPassword = ({children})=>{
    const isPassword = localStorage.getItem('isPassword');
    
    return isPassword ? children : <h1>Please Set Your Password</h1>;
}