import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar ,faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons';

export const Products = () =>{
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    loop: true,
  });

  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [1, 2, 3, 4, 5, 6];

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

  return (
    <div className="relative max-w-4xl mx-auto py-8">   
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((number) => (
            <div key={number} className="flex-[0_0_30%] px-2" >
                <div className="relative max-w-xs bg-white border rounded-lg shadow-sm p-4  ">
                    <button className="absolute top-4 right-4  rounded-full w-8 h-8 flex items-center justify-center  hover:shadow group ">
                            <FontAwesomeIcon icon={faHeart} className="h-5 w-5 group-hover:text-emerald" />
                    </button>

                    <div className="flex justify-center mb-4">
                        <img src="../../../public/1738995002435-laptop.png" alt="JBL TUNE 600BTNC" className="w-40 h-40 object-contain" />
                    </div>

                    <div className="relative">
                        <span className="text-lg font-semibold">JBL TUNE 600BTNC</span>
                        <span className="text-gray-600 text-sm pl-4 absolute right-0 top-1">$59.00</span>
                        <p className="text-sm text-gray-500 mt-2"> Premium Bone Conduction Open Ear Bluetooth</p>
                        <div className="flex items-center justify-center mt-2">
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                            <FontAwesomeIcon icon={faStar} className="text-emerald mr-1 last:mr-0" /> 
                        <span className="ml-2 text-sm text-gray-500">(121)</span>
                        </div>
                        <button className="mt-4  border-2 border-emerald hover:text-lightyellow duration-100 px-4 py-2 rounded-2xl hover:bg-emerald">
                        Add to Cart
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={scrollPrev} className=" absolute  -left-8 top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100 group " >
        <span className="p-2">
            <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5 text-gray-600 group-hover:text-emerald" />
        </span>
      </button>

      <button onClick={scrollNext} className=" absolute -right-10  top-1/2 -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow hover:bg-gray-100 group ">
        <span className="p-2">
            <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5 text-gray-600 group-hover:text-emerald" />
        </span>
      </button>

      
    </div>
  );
}
export default Products;