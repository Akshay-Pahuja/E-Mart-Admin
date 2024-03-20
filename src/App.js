import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Resetpassword from "./pages/Resetpassword"
import Forgotpassword from "./pages/Forgotpassword"
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Bloglist from './pages/Bloglist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Categorylist from './pages/Categorylist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Blogcatlist from './pages/Blogcatlist';
import Addproduct from './pages/Addproduct';
import Addbrand from './pages/Addbrand';
import Addcat from './pages/Addcat';
import Addcolor from './pages/Addcolor';
import Addblogcat from './pages/Addblogcat';
import Addblog from './pages/Addblog';
import Couponslist from './pages/Couponslist';
import Addcoupon from './pages/Addcoupon';

function App() {
  return (
   <Router>
    <Routes>
    <Route path="/" element={<Login />} />
        <Route path="reset-password/:token" element={<Resetpassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/admin" element={<MainLayout />}>
        <Route path='blog-list' element = {<Bloglist/>}/>
        <Route index element={<Dashboard />} />
        <Route path='blog-category-list' element={<Blogcatlist/>}/>
        <Route path='orders' element = {<Orders/>}/>
        <Route path = 'customers' element = {<Customers/>}/>
        <Route path='color-list' element = {<Colorlist/>} />
        <Route path='category-list' element = {<Categorylist/>}/>
        <Route path='brand-list' element = {<Brandlist/>}/>
        <Route path='product-list' element = {<Productlist/>}/>
        <Route path = 'product' element = {<Addproduct/>}/>
        <Route path = 'product/:id' element = {<Addproduct/>}/>
        <Route path='brand' element = {<Addbrand/>}/>
        <Route path='brand/:id' element = {<Addbrand/>}/>
        <Route path='category' element = {<Addcat/>}/>
        <Route path='category/:id' element = {<Addcat/>}/>
        <Route path='color' element = {<Addcolor/>}/>
        <Route path='color/:id' element = {<Addcolor/>}/>
        <Route path='blog-category' element = {<Addblogcat/>}/>
        <Route path='blog-category/:id' element = {<Addblogcat/>}/>
        <Route path='addblog' element={<Addblog/>}/>
        <Route path='addblog/:id' element={<Addblog/>}/>
        <Route path = 'coupon-list' element = {<Couponslist/>}/>
        <Route path='addcoupon' element = {<Addcoupon/>}/>
        <Route path='addcoupon/:id' element = {<Addcoupon/>}/>
        </Route>
    </Routes>
   </Router>
  );
}

export default App;
