import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Sliderbar/Layout';
import Dashbord from './Sliderbar/Dashbord';
import CategoriesRead from './Sliderbar/categories/CategoriesRead';
import CategoriesCreat from "./Sliderbar/categories/CategoriesCreat";
import CategoriesUpdate from "./Sliderbar/categories/CategoriesUpdate";
import ProductRead from './Sliderbar/product/ProductRead';
import ProductCreat from './Sliderbar/product/ProductCreat';

function App() {
  return (
  <>
  <div className='bg-slate-100 '>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>} >
          <Route path="/" element={<Dashbord/>} /> 
          {/* Categories */}
          <Route path='/categories' element={<CategoriesRead/>}/>
          <Route path='/categoriescreat' element={<CategoriesCreat/> }/>
          <Route path='/categoriesupdate/:id' element={<CategoriesUpdate/>} />
          {/* Products */}
          <Route path='/product' element={<ProductRead/>} />
          <Route path='/productscreat' element={<ProductCreat/>} />
        </Route>
      </Routes>    
    </BrowserRouter>
  </div>

  </>
  )
}

export default App
