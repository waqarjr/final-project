import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const Carousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [
    {
      image: '../../../public/slider-3.png',
      title: 'Slide One',
      description: 'This is the description for slide one.',
    },
    {
      image: '../../../public/slider-4.png',
      title: 'Slide Two',
      description: 'This is the description for slide two.',
    },
    {
      image: '../../../public/slider-5.png',
      title: 'Slide Three',
      description: 'This is the description for slide three.',
    },
    {
      image: '../../../public/slider-6.png',
      title: 'Slide Four',
      description: 'This is the description for slide four.',
    },
  ];

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
        {slides.map((slide, index) => (
            <div key={index} className={`flex-[0_0_100%] relative  ${
              selectedIndex === index ? 'scale-100' : 'scale-90 opacity-70' }`} >
              <img src={slide.image} alt={slide.title} className="w-full h-auto object-cover"/>
              <div className="absolute max-w-2xl inset-0 flex items-center justify-center ">
                <div className="bg-black bg-opacity-50 text-white p-4  ">
                  <h2 className="text-2xl font-bold">{slide.title}</h2>
                  <p className="mt-2">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={scrollPrev} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow hover:bg-opacity-100">
        <span className="sr-only">Previous Slide</span>
        &larr;
      </button>
      <button onClick={scrollNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 shadow hover:bg-opacity-100" >
        <span className="sr-only">Next Slide</span>
        &rarr;
      </button>

      <div className="flex justify-center mt-4">
        {slides.map((_, index) => (
          <button key={index} onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${selectedIndex === index ? 'bg-blue-500' : 'bg-gray-300' }`} >
          </button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
