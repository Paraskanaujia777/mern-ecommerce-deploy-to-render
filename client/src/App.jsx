
import './App.css'
import AdminLayout from './components/admin-view/layout'
import AuthLayout from './components/auth/layout'
import ShoppingLayout from './components/shopping-view/layout'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import AuthLogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/not-found'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingListing from './pages/shopping-view/listing'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'


function App() {
  // const isAuthenticated = true;
  // const user = null;
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      const token = JSON.parse(sessionStorage.getItem('token'))
      dispatch(checkAuth(token))
    

  }}, [dispatch])




  return (
    <>
      <div className="flex w-full flex-col overflow-hidden bg-red">
        <Routes>
    
          

          <Route path="/" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>

            <Route path="" element={<AuthLogin />}></Route>
            {/* <Route path="register" element={<AuthRegister />}></Route> */}
          </Route>

          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }>

            <Route path="login" element={<AuthLogin />}></Route>
            <Route path="register" element={<AuthRegister />}></Route>
          </Route>

          <Route path='/admin' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }>
            <Route path='dashboard' element={<AdminDashboard />}></Route>
            <Route path='orders' element={<AdminOrders />}></Route>
            <Route path='features' element={<AdminFeatures />}></Route>
            <Route path='products' element={<AdminProducts />}></Route>
          </Route>

          <Route path='/shop' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }>
            <Route path='account' element={<ShoppingAccount />}></Route>
            <Route path='checkout' element={<ShoppingCheckout />}></Route>
            <Route path='home' element={<ShoppingHome />}></Route>
            <Route path='listing' element={<ShoppingListing />}></Route>
          </Route>

          <Route path='*' element={<NotFound />}></Route>
          <Route path='/unauth-page' element={<UnauthPage />}></Route>



        </Routes>

      </div>
    </>
  )
}

export default App
