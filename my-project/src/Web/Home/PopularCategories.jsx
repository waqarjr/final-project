import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export const PopularCategories = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const read_data = async () => {
    const res = await axios.post("http://localhost:4000/readcategory");
    setData(res.data);
  };

  const Product_data = async () => {
    const res = await axios.get("http://localhost:4000/read-product");
    setProducts(res.data);
  };
  useEffect(() => {
    read_data();
    Product_data();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((prod) => {
      counts[prod.category] = (counts[prod.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <section className="max-w-[1390px] mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-emerald">
        Popular Categories
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((values, index) => (
          <Link to="/shop" key={index}
            className="flex items-center bg-white border hover:border-emerald rounded-md p-4 hover:shadow-sm transition-shadow" >
            <img
              src={values.image}
              alt={values.name}
              className="w-14 h-14 object-contain mr-4"
            />
            <div>
              <h3 className="text-lg font-medium">{values.name}</h3>
              <p className="text-sm text-gray-500">
                {categoryCounts[values._id] || 0} Items Available
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
