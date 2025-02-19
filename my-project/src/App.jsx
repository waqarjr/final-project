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

function App() {
  return (
  <>
  <div className='bg-slate-100 '>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route path="/admin/dashbord" element={<Dashbord/>} /> 
          {/* Categories */}
          <Route path='/admin/categories' element={<CategoriesRead/>}/>
          <Route path='/admin/categoriescreat' element={<CategoriesCreat/> }/>
          <Route path='/admin/categoriesupdate/:id' element={<CategoriesUpdate/>} />
          {/* Products */}
          <Route path='/admin/product' element={<ProductRead/>} />
          <Route path='/admin/productscreat' element={<ProductCreat/>} />
          <Route path='/admin/productupdate/:id' element={<ProductUpdate/>} />
          {/* manufacturer */}
          <Route path='/admin/manufacture' element={<Read_manufacture/>}/>
          <Route path='/admin/manufacturecreat' element={<Creat_manufacture/>} />
          <Route path='/admin/manufactureupdate/:id' element={<Update_manufacture/>} />
          {/* Carousel */}
          <Route path='/admin/carousel' element={<Read_Carousel/>} />
          <Route path='/admin/carouselcreat' element={<Creat_Carousel/>} />
          <Route path='/admin/carouselupdate/:id' element={<Update_Carousel/>}  />
          {/* webSetting */}
          <Route path='/admin/contactus' element={<Contact_Us/>} /> 
          <Route path='/admin/iconchange' element={<Icon_change/>} />
        </Route>
      </Routes>    
    </BrowserRouter>
  </div>
  </>
  )
}

export default App
