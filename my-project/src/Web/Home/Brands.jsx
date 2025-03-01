import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
export const Brands = ()=>{
  
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      duration: 5000 // Adjust transition speed (lower = faster)
    }, 
    [Autoplay({ delay: 0, stopOnInteraction: false })]
  );

  const slides = [
    { image: '../../../public/1.png' },
    { image: '../../../public/2.png' },
    { image: '../../../public/3.png' },
    { image: '../../../public/4.png' },
    { image: '../../../public/5.png' },
  ];

return(<>

<div className=" max-w-[1390px] mx-auto px-4 py-8 bg-lightyellow">
        <div className="flex  items-center justify-between space-x-4">
        {slides.map((slide, index) => (
            <div key={index} className=" bg-gray-50  " >
              <img src={slide.image}  className="  px-10"/>
            </div>
          ))}
        </div>
      </div>

</>)

}
export default Brands;