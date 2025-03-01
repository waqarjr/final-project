import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [data , setData] = useState([]);

  const read_image = async ()=>{
      const data = await axios.get("http://localhost:4000/readcarousel");
      setData(data.data);
  }
  useEffect(()=>{
      read_image();
      document.title = "Carousel";
  },[])
  
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
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
        {data.map((slide, index) => (
            <div key={index} className={`flex-[0_0_100%] relative ${
              selectedIndex === index ? 'scale-100' : 'scale-90 opacity-70' }`} >
              <img src={slide.image} alt={slide.title} className="w-full "/>
              <div className="absolute  md:max-w-2xl sm:max-w-xl max-w-md inset-0 flex items-center justify-center ">
                <div className=" p-4  ">
                  <h2 className=" md:text-3xl text-2xl font-bold">{slide.name}</h2>
                  <p className="my-3 ">{slide.title}</p>
                  <button className="inline-flex items-center px-3 py-1 border border-emerald text-emerald rounded-md hover:bg-emerald hover:text-white transition-colors duration-300">
                  Check Out  <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 ml-2" />
                </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={scrollPrev} className="absolute top-1/2 left-14 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full size-8 shadow hover:bg-opacity-100">
      <FontAwesomeIcon icon={faChevronLeft} className='text-emerald' />
      </button>
      <button onClick={scrollNext} className="absolute top-1/2 right-14 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full size-8 shadow hover:bg-opacity-100" >
      <FontAwesomeIcon icon={faChevronRight} className='text-emerald' />
      </button>

      <div className="flex justify-center mt-4">
        {data.map((_, index) => (
          <button key={index} onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${selectedIndex === index ? 'bg-emerald' : 'bg-gray-300' }`} >
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
