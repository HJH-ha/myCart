import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user }) => {
  // 유저인증 정보가 있으면 Outlet 요청한 주소로 이동 없으면 로그인 페이지
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
