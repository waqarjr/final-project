import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useMemo } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCartStore from '../Store';

export const ShopList = () => {
  const navigate = useNavigate();
  const updateCart = useCartStore((state) => state.updateCart);
  const [categoriesClick, setCategoriesClick] = useState(true);
  const [productsClick, setProductsClick] = useState(true);
  const [checkboxCategory, setCheckboxCategory] = useState([]);
  const [checkboxManufacture, setCheckboxManufacture] = useState([]);

  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const productsPerPage = 5;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(data.length / productsPerPage) || 1;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const read_Category = async () => {
    try {
      const response = await axios.get('http://localhost:4000/readcategory');
      setCategories(response.data);
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  };

  const read_Manufacturer = async () => {
    try {
      const response = await axios.get('http://localhost:4000/readmanufacture');
      setManufacturer(response.data);
    } catch (err) {
      console.error("Failed to load manufacturers", err);
    }
  };

  useEffect(() => {
    read_Category();
    read_Manufacturer();
    document.title = "Shop";
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};
    data.forEach((prod) => {
      counts[prod.category] = (counts[prod.category] || 0) + 1;
    });
    return counts;
  }, [data]);

  const Filter = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("category", checkboxCategory);
      formData.append("manufacture", checkboxManufacture);
      
      const response = await axios.post("http://localhost:4000/frontfilter", formData);
      setData(response.data);
      setCurrentPage(1); // Reset page on filter change
    } catch (err) {
      console.error("Failed to filter products", err);
    } finally {
      setLoading(false);
    }
  };

  const setFilterCategory = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckboxCategory([...checkboxCategory, value]);
    } else {
      setCheckboxCategory(checkboxCategory.filter(e => e !== value));
    }
  };

  const setFilterManufacture = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCheckboxManufacture([...checkboxManufacture, value]);
    } else {
      setCheckboxManufacture(checkboxManufacture.filter(e => e !== value));
    }
  };

  useEffect(() => {
    Filter();
  }, [checkboxCategory, checkboxManufacture]);

  const getId = async (productId) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      navigate('/signin');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/cartitems', {
        productid: productId,
        quantity: 1
      }, {
        withCredentials: true
      });

      updateCart();
      if (response.data.message) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        Toast.fire({
          icon: "success",
          title: `${response.data.message}`
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.error || "Failed to add item to cart.",
        icon: "error"
      });
    }
  };

  return (
    <>
      <Header />
      <div className="bg-[url('../../../public/page-header-bg.jpg')] w-full h-[150px] flex items-center justify-center">
        <div className="text-center">
          <h3 className="md:text-5xl text-2xl font-thin">List</h3>
          <p className="md:text-xl text-md text-emerald">Shop</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className='my-8'>
          <p className='text-gray-400'>
            <span className='hover:text-black cursor-pointer' onClick={() => navigate('/')}>Home </span> &nbsp; &gt; &nbsp;
            <span className='hover:text-black cursor-pointer'>Shop</span>
          </p>
        </div>
        <h3>Filters</h3>
        <div className="grid grid-cols-[25%_auto] gap-6">
          <div>
            <div className='my-3'>
              <ul>
                <li className='flex items-center justify-between my-6 hover:cursor-pointer' onClick={() => setCategoriesClick(!categoriesClick)}>
                  <p className='font font-xl font-semibold'>Categories</p>
                  <FontAwesomeIcon icon={categoriesClick ? faChevronUp : faChevronDown} />
                </li>
                <ul className={`${categoriesClick ? "" : "hidden"}`}>
                  {categories.map((value, index) => (
                    <li key={index} className='flex items-center justify-between my-4'>
                      <label className="flex items-center">
                        <input type="checkbox" onChange={setFilterCategory} value={value._id} />
                        <span className='mx-2'>{value.name}</span>
                      </label>
                      <div className='bg-slate-200 px-1 rounded'>
                        {categoryCounts[value._id] || 0}
                      </div>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
            <hr />
            <div className='my-5'>
              <ul>
                <li className='flex items-center justify-between my-6 hover:cursor-pointer' onClick={() => setProductsClick(!productsClick)}>
                  <p className='font font-xl font-semibold'>Manufacture</p>
                  <FontAwesomeIcon icon={productsClick ? faChevronUp : faChevronDown} />
                </li>
                <ul className={`${productsClick ? "" : "hidden"}`}>
                  {manufacturer.map((value, index) => (
                    <li key={index} className='flex items-center justify-between my-4'>
                      <label className="flex items-center">
                        <input type="checkbox" onChange={setFilterManufacture} value={value._id} />
                        <span className='mx-2'>{value.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>
          </div>

          <div>
            {loading ? (
              <div className="text-center py-12 font-medium text-gray-500">Loading products...</div>
            ) : currentProducts.length === 0 ? (
              <div className="text-center py-12 font-medium text-gray-500">No products found matching filters.</div>
            ) : (
              currentProducts.flat().map((value, index) => {
                const price = value.price_discount && value.price_discount < value.price ? value.price_discount : value.price;
                return (
                  <div className='grid grid-cols-[20%_50%_30%] border-b py-2' key={index}>
                    <Link to={`/product/${value._id}`}>
                      <img src={value.image} alt="" className='w-[200px]' />
                    </Link>
                    <div>
                      <div className='flex justify-between text-lg'>
                        <p>{value.title}</p>
                      </div>
                      <p className='my-3 text-gray-400 font-medium'>{value.short_description}</p>
                    </div>
                    <div className='mx-auto my-auto text-center'>
                      <p className='font-bold text-lg'>Rs. {price}</p>
                      {value.price_discount && value.price_discount < value.price && (
                        <p className='text-xs line-through text-red-500'>Rs. {value.price}</p>
                      )}
                      {[...Array(5)].map((_, id) => (
                        <FontAwesomeIcon key={id} icon={faStar} className='my-2 text-yellow-400' />
                      ))}
                      <br />
                      <button className="bg-emerald px-3 py-2 text-white rounded-sm cursor-pointer hover:bg-[#3ac6a1]" onClick={() => getId(value._id)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className='text-right my-4'>
          <button className='px-2 py-1 bg-slate-300 rounded-md mx-2' onClick={handlePrevious} disabled={currentPage === 1}> &lt; </button>
          <span>{currentPage} of {totalPages} </span>
          <button className='px-2 py-1 bg-slate-300 rounded-md mx-2' onClick={handleNext} disabled={currentPage === totalPages}>&gt;</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopList;