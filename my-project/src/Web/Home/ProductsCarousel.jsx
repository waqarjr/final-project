import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar ,faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../Store';
import Swal from 'sweetalert2';
export const ProductsCarousel = () =>{
  const updateCart = useCartStore((state) => state.updateCart);
  const [data, setData] = useState([]);
  const [products , setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const navigate = useNavigate();
  const Product_data = async () => {
    const res = await axios.get("http://localhost:4000/read-product");
    setProducts(res.data);
    setFilteredProducts(res.data);
  };
  const read_data = async () => {
    const res = await axios.post("http://localhost:4000/readcategory");
    setData(res.data);
  };
  useEffect(()=>{
    read_data()
    Product_data();
  },[])

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);


  const handlevalue = (categoryId) => {
    const filtered = products.filter(
      product => product.category === categoryId
    );
    setFilteredProducts(filtered);
  }
  const allData = ()=>{
    setFilteredProducts(products);
    setActiveTab(null);

  }
  const handleClick = (name) => {
    setActiveTab(name);
  };

  const getId = async(id)=>{
    const email = localStorage.getItem("userEmail");
    const quantity = 1;
    if(email != null){
     const a = await axios.post('http://localhost:4000/cartitems',{email:email,productid:id,quantity:quantity});
     updateCart();
     if(a.data.message){
      const Toast = Swal.mixin({
        toast: true, position: "top-end", timer: 2000, timerProgressBar: true,showConfirmButton: false,
      });
      Toast.fire({
        icon: "success", title: `${a.data.message}`
      });
      }
    } else {
      navigate('/signin')
    }
  }

  return (<>
    <div className="relative max-w-[1390px] mx-auto px-4 py-8">   

    <div className='flex items-center justify-between mb-7'>
      <h3 className='text-4xl text-emerald'>New Arivals</h3>
      <div>
        <span className={`mx-2 border-b-2 hover:border-emerald p-2 cursor-pointer hover:text-emerald ${
                activeTab ? "" : "text-emerald border-emerald" }`} onClick={allData} >All</span>
        {data.map((values,index)=>(
          <div key={index} className='inline-block' onClick={()=>{handlevalue(values._id)}} > 
              <span onClick={() => handleClick(values.name)}
              className={`mx-2 border-b-2 hover:border-emerald p-2 cursor-pointer hover:text-emerald ${
                activeTab === values.name ? "text-emerald border-emerald" : "" }`} >
              {values.name}
            </span>
          </div>
          ))}
      </div>
    </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {filteredProducts.map(( values,index) => (
            <div key={index} className="md:flex-[0_0_20%] px-1 " >
                <div className="relative max-w-xs bg-white border rounded-lg shadow-sm p-4  hover:border-emerald hover:shadow-md ">

                    <Link to={`/product/${values._id}`} className="flex justify-center mb-4">
                        <img src={values.image} alt={values.name} className="w-40 h-40 object-contain" />
                    </Link>
        
                    <div className="relative">
                        <span className="text-lg font-semibold">{values.keywords} </span>
                        <span className="text-gray-600 text-sm pl-4 absolute right-0 top-1">${values.price}</span>
                        <p className="text-sm text-gray-500 mt-2"> {values.title}</p>
                        <div className=" mt-2 ">
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                        <span className="ml-2 text-sm text-gray-500">(121)</span>
                        </div>
                        <button className="mt-4  border-2 border-emerald hover:text-lightyellow duration-100 px-2 py-1 font-light   rounded-2xl hover:bg-emerald"
                       onClick={() => getId(values._id)}>
                        Add to Cart
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={scrollPrev} className=" absolute  left-0 top-1/2 -translate-y-1/2 bg-white rounded-full size-10 flex items-center justify-center shadow hover:bg-gray-100 group " >
        <span className="p-2">
            <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5 text-gray-600 group-hover:text-emerald" />
        </span>
      </button>

      <button onClick={scrollNext} className=" absolute right-0  top-1/2 -translate-y-1/2 bg-white rounded-full size-10 flex items-center justify-center shadow hover:bg-gray-100 group ">
        <span className="p-2">
            <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 text-gray-600 group-hover:text-emerald" />
        </span>
      </button>
    </div>
    <hr className='mb-8'/> </>);
}
export default ProductsCarousel;