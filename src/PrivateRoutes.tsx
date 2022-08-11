import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ isAuth }: { isAuth: boolean }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
