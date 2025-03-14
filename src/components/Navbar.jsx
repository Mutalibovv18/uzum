import { useEffect, useState } from "react";

const Carousel = () => {
  const slides = [
    "https://images.uzum.uz/cv3eg7ei4n36ls3t0770/main_page_banner.jpg",
    "https://images.uzum.uz/cug7q9tht56sc95cis1g/main_page_banner.jpg",
    "https://images.uzum.uz/cv4o265pb7f9qcng1frg/main_page_banner.jpg",
    "https://images.uzum.uz/cuuoplei4n36ls3rla6g/main_page_banner.jpg",
    "https://images.uzum.uz/cuuljv3vgbkm5ehgnhcg/main_page_banner.jpg",
  ];

  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div
      className="max-w-screen-xl mx-auto overflow-hidden rounded-xl relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`w-full transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide} className="w-full rounded-xl" alt={`Slide ${index + 1}`} />
        </div>
      ))}
      
   
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
          className="btn btn-circle"
        >
          ❮
        </button>
        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
          className="btn btn-circle"
        >
          ❯
        </button>
      </div>
      

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-primary" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
