import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Sliderbar/Layout';
import Dashbord from './Sliderbar/Dashbord';

import CategoriesRead from './Sliderbar/categories/CategoriesRead';
import CategoriesCreat from "./Sliderbar/categories/CategoriesCreat";
import CategoriesUpdate from "./Sliderbar/categories/CategoriesUpdate";

import ProductRead from './Sliderbar/product/ProductRead';
import ProductCreat from './Sliderbar/product/ProductCreat';
import ProductUpdate from './Sliderbar/product/ProductUpdate';

import Read_manufacture from './Sliderbar/Manufacturer/Read_manufacture';
import Creat_manufacture from './Sliderbar/Manufacturer/Creat_maufacture';
import Update_manufacture from './Sliderbar/Manufacturer/Update_manufacture';

import Read_Carousel from './Sliderbar/carousel/Read_Carousel';
import Creat_Carousel from './Sliderbar/carousel/Creat_Carousel';
import Update_Carousel from './Sliderbar/carousel/Update_Carousel';

import Contact_Us from './Sliderbar/Websetting/Contact_Us';
import Icon_change from './Sliderbar/Websetting/Icon__change';

import Admin from './Sliderbar/Login/Login';

import ProtectedRoute from './Sliderbar/ProtecedRouter';
import ConformPassword from './Sliderbar/Login/ConformPassword';
import ChangePassword from './Sliderbar/Login/ChangePassword';
import ProtectChanPass from './Sliderbar/ProtectedChngPass';

import View_orders from './Sliderbar/orders/View_orders';
import Read_orders from './Sliderbar/orders/Read_orders';

import Weblayout from './Web/weblayout';
import Index from './Web/Index';
import Carousel from './Web/Home/Carousel';
import ShopList from './Web/HeaderPart/ShopList';
import ContactUs from './Web/HeaderPart/ContactUs';
import Product from './Web/HeaderPart/Product';
import Signin from './Web/HeaderPart/SignIn';
import SignUp from './Web/HeaderPart/SignUp';
import Account from './Web/HeaderPart/Account';
import ViewCart from './Web/HeaderPart/ViewCart';
import Checkout from './Web/HeaderPart/Checkout';
import ProtecedRouter from './Web/ProtectedAccount';
import CustomerDetail from './Web/HeaderPart/CustomerDetails';
import AboutUs from './Web/HeaderPart/AboutUs';
import { ForgetPassword } from './Web/HeaderPart/Forgetpassword';

function App() {
  return (
  <>
  <div className='bg-slate-100 '>
    <BrowserRouter>
      <Routes>

        <Route path="/admin" element={<Admin/>} />

        <Route path="/" element={<Layout/>} >
          <Route path="/admin/dashbord" element={<ProtectedRoute><Dashbord/></ProtectedRoute>} /> 
          {/* Categories */}
          <Route path='/admin/categories' element={<ProtectedRoute><CategoriesRead/></ProtectedRoute> }/>
          <Route path='/admin/categoriescreat' element={<ProtectedRoute><CategoriesCreat/></ProtectedRoute>  }/>
          <Route path='/admin/categoriesupdate/:id' element={<ProtectedRoute><CategoriesUpdate/></ProtectedRoute> } />
          {/* Products */}
          <Route path='/admin/product' element={ <ProtectedRoute><ProductRead/></ProtectedRoute> } />
          <Route path='/admin/productscreat' element={  <ProtectedRoute><ProductCreat/></ProtectedRoute> } />
          <Route path='/admin/productupdate/:id' element={<ProtectedRoute><ProductUpdate/></ProtectedRoute> } />
          {/* manufacturer */}
          <Route path='/admin/manufacture' element={ <ProtectedRoute><Read_manufacture/></ProtectedRoute> }/>
          <Route path='/admin/manufacturecreat' element={<ProtectedRoute><Creat_manufacture/></ProtectedRoute> } />
          <Route path='/admin/manufactureupdate/:id' element={<ProtectedRoute><Update_manufacture/></ProtectedRoute> } />
          {/* Carousel */}
          <Route path='/admin/carousel' element={ <ProtectedRoute><Read_Carousel/></ProtectedRoute>} />
          <Route path='/admin/carouselcreat' element={<ProtectedRoute><Creat_Carousel/></ProtectedRoute> } />
          <Route path='/admin/carouselupdate/:id' element={<ProtectedRoute><Update_Carousel/></ProtectedRoute>}  />
          {/* webSetting */}
          <Route path='/admin/contactus' element={<ProtectedRoute><Contact_Us/></ProtectedRoute> } /> 
          <Route path='/admin/iconchange' element={<ProtectedRoute><Icon_change/></ProtectedRoute> } />
          {/* Admin Page */}
          <Route path='/admin/conformpassword' element={<ProtectedRoute><ConformPassword/></ProtectedRoute> } />
          
          {/* Costomer Orders */}
          <Route path='/admin/orders' element={<ProtecedRouter><Read_orders/></ProtecedRouter>} />
          <Route path='/admin/orders/:id' element={<ProtecedRouter><View_orders/></ProtecedRouter>}  />  

          <Route path='/admin/changepassword' element={<ProtectedRoute> <ProtectChanPass><ChangePassword/></ProtectChanPass></ProtectedRoute>} />

        </Route>
      </Routes>    
    </BrowserRouter>
  </div>

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Weblayout/>} >

        <Route path='/' element={<Index/>} />
        <Route path='/carousel' element={<Carousel/>} />
        <Route path="/shop"  element={<ShopList/>}  />
        <Route path='/contact' element={<ContactUs/>} />
        <Route path='/product/:id' element={<Product/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/account' element={<Account/> } />
        <Route path='/viewcart' element={<ViewCart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/customerDetail/:id' element={<CustomerDetail/>} />
        <Route path='/aboutus' element={<AboutUs/>} />
        <Route path='/forgetpassword' element={<ForgetPassword/>}  />
        </Route>
      </Routes>    
    </BrowserRouter>
  
    
  </>
  )
}

export default App
