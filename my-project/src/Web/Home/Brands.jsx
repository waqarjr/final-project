import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
export const Brands = ()=>{
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: 5000 // Adjust transition speed (lower = faster)
    }, 
    [Autoplay({ delay: 0, stopOnInteraction: false })]
  );

  const slides = [
    { image: '../../../public/slider-3.png' },
    { image: '../../../public/slider-4.png' },
    { image: '../../../public/slider-5.png' },
    { image: '../../../public/slider-6.png' },
    { image: '../../../public/slider-6.png' },
    { image: '../../../public/slider-6.png' },
  ];

return(<>

<div className="overflow-hidden" ref={emblaRef}>
        <div className="flex  space-x-4">
        {slides.map((slide, index) => (
            <div key={index} className="flex-[0_0_40%] " >
              <img src={slide.image}  className="w-full h-auto object-cover"/>
            </div>
          ))}
        </div>
      </div>

</>)

}
export default Brands;