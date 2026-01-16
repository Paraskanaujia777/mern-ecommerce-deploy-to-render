import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  // 🚫 Not logged in → block protected routes
  if (
    !isAuthenticated &&
    (path.startsWith("/shop") || path.startsWith("/admin"))
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // 🔐 Logged in → block auth pages
  if (
    isAuthenticated &&
    (path.includes("/auth/login") || path.includes("/auth/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/shop/home" replace />;
  }

  // 🚫 Non-admin trying admin routes
  if (isAuthenticated && user?.role !== "admin" && path.startsWith("/admin")) {
    return <Navigate to="/unauth-page" replace />;
  }

  // 🚫 Admin trying shop routes
  if (isAuthenticated && user?.role === "admin" && path.startsWith("/shop")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}

export default CheckAuth;











// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({isAuthenticated , user , children}){

//     const location = useLocation();

//     if(isAuthenticated && !(location.pathname.includes("/auth/login") || location.pathname.includes("/auth/register") )){

//         return  <Navigate to="/auth/login" />
//     }


//     if(isAuthenticated && (location.pathname.includes("/login") || location.pathname.includes("/register") )){

//         if(user?.role === "admin"){
//             return <Navigate to="/admin/dashboard"/>;
//         }
//         else{
//             return <Navigate to="/shop/home"/>;
//         }
//     }
//     if(isAuthenticated && user?.role !== "admin" && (location.pathname.includes("/admin")) ){
//         return <Navigate to="/unauth-page"/>
//     }

//     if(isAuthenticated && user?.role === "admin" && (location.pathname.includes("/shop")) ){
//         return <Navigate to="/admin/dashboard"/>
//     }


//     return(
//         <>
//          {children}
//         </>
//     )




   
// }

// export default CheckAuth;