import React, { useState } from 'react';
import { Product } from '../types';
import { usePricing } from '../hooks/usePricing';

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { formatPrice } = usePricing();

  if (!products || products.length === 0) {
    return <div className="text-center p-4">No products to display. Add some in the admin panel!</div>;
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === products.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const currentProduct = products[currentIndex];

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
        <img src={currentProduct.image} alt={currentProduct.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
          <h3 className="text-xl font-bold">{currentProduct.name}</h3>
          <p className="text-sm">{currentProduct.description}</p>
          <p className="text-lg font-semibold mt-2">{formatPrice(currentProduct.price)}</p>
        </div>
      </div>

      <button onClick={goToPrevious} className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/50 p-2 rounded-full text-gray-800 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white">
        &#10094;
      </button>
      <button onClick={goToNext} className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/50 p-2 rounded-full text-gray-800 hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white">
        &#10095;
      </button>
      
      <div className="flex justify-center mt-4">
        {products.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full mx-1 cursor-pointer transition-colors ${currentIndex === index ? 'bg-gray-800' : 'bg-gray-400'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
