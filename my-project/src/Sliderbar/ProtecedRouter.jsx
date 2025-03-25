import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn"); 

  return isAuthenticated ? children : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
