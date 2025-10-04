
import React, { useState, useMemo } from 'react';
import { Product, PricingConfig } from '../types';
import { usePricing } from '../hooks/usePricing';
import { WHATSAPP_NUMBER } from '../constants';
import { PayPalIcon, WhatsAppIcon } from './Icons';

interface MediaModalProps {
  mediaUrl: string;
  onClose: () => void;
}

const getYouTubeEmbedUrl = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}?autoplay=1`;
    }
    return null;
};

const MediaModal: React.FC<MediaModalProps> = ({ mediaUrl, onClose }) => {
    if (!mediaUrl) return null;

    const isImage = /\.(jpeg|jpg|gif|png)$/i.test(mediaUrl);
    const isVideo = /\.(mp4|webm|ogg)$/i.test(mediaUrl);
    const youTubeEmbedUrl = getYouTubeEmbedUrl(mediaUrl);

    let content;
    if (isImage) {
        content = <img src={mediaUrl} alt="Vista del producto" className="max-w-full max-h-full object-contain rounded-lg" />;
    } else if (isVideo) {
        content = <video src={mediaUrl} controls autoPlay className="max-w-full max-h-full object-contain rounded-lg" />;
    } else if (youTubeEmbedUrl) {
        content = (
            <div className="aspect-video w-full">
                <iframe
                    src={youTubeEmbedUrl}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video del producto"
                    className="w-full h-full"
                ></iframe>
            </div>
        );
    } else {
         content = <p className="text-white">Formato de medio no soportado o URL inválida.</p>;
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4 animate-fade-in"
            onClick={onClose}
        >
            <div
                className="relative bg-transparent p-2 rounded-lg max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 text-white bg-gray-900 bg-opacity-70 rounded-full h-10 w-10 flex items-center justify-center text-2xl z-10 hover:bg-opacity-100 transition-all"
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                {content}
            </div>
        </div>
    );
};


interface ProductSliderProps {
  products: Product[];
  config: PricingConfig;
}

const ProductCard: React.FC<{ product: Product; config: PricingConfig }> = ({ product, config }) => {
    const { tier, prices } = usePricing(product, config);
    const [modalUrl, setModalUrl] = useState<string | null>(null);

    const paypalLink = useMemo(() => {
        const params = new URLSearchParams({
            cmd: '_xclick',
            business: product.paypalBusinessId,
            item_name: product.name,
            item_number: product.itemID,
            amount: prices.finalPrice.toFixed(2),
            currency_code: 'USD',
            no_shipping: '1',
            lc: 'es_ES',
        });
        return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
    }, [product, prices.finalPrice]);

    const whatsAppMessage = useMemo(() => {
        let platform = "la plataforma principal";
        if (tier === 'AGENT') platform = "la plataforma de Agente";
        if (tier === 'PROMOTER') platform = "la plataforma de Promotor";

        const message = `Hola, estoy interesado/a en el producto "${product.name}". Vengo desde ${platform}. ¿Podrían darme más información? (itemID: ${product.itemID})`;
        return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    }, [product, tier]);

    return (
        <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 w-full max-w-md text-center flex flex-col items-center transform transition-transform duration-500">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">{product.name}</h2>
                <p className="text-slate-600 mb-4 min-h-[3rem]">{product.description}</p>
                
                <div className="flex justify-center items-center space-x-5 mb-4 h-8">
                    {product.imageUrl && (
                        <button onClick={() => setModalUrl(product.imageUrl!)} className="text-slate-500 hover:text-blue-600 transition-colors" aria-label="Ver imagen del producto">
                            <i className="fas fa-image fa-lg"></i>
                        </button>
                    )}
                    {product.videoUrl && (
                        <button onClick={() => setModalUrl(product.videoUrl!)} className="text-slate-500 hover:text-red-600 transition-colors" aria-label="Ver video del producto">
                            <i className="fas fa-play-circle fa-lg"></i>
                        </button>
                    )}
                </div>
                
                <div className="mb-6">
                    <span className="text-xl text-gray-500 line-through">P.V.P. ${prices.pvp.toFixed(2)}</span>
                    <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 my-2">${prices.finalPrice.toFixed(2)}</p>
                    <span className="text-sm font-semibold text-gray-500">USD</span>
                </div>

                <div className="w-full space-y-4">
                     <a href={paypalLink} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg shadow-md">
                        <PayPalIcon className="w-6 h-6 mr-3" />
                        Comprar ahora con PayPal
                    </a>
                    <a href={whatsAppMessage} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 text-lg shadow-md">
                        <WhatsAppIcon className="w-6 h-6 mr-3" />
                        Contactar por WhatsApp
                    </a>
                </div>
                 <p className="text-xs text-gray-400 mt-6">ItemID: {product.itemID}</p>
            </div>
            {modalUrl && <MediaModal mediaUrl={modalUrl} onClose={() => setModalUrl(null)} />}
        </>
    );
};


export const ProductSlider: React.FC<ProductSliderProps> = ({ products, config }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
  
  if (!products || products.length === 0) {
      return <div className="text-white text-center">No hay productos para mostrar.</div>;
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-4 relative">
        <header className="absolute top-8 text-center text-white">
            <h1 className="text-5xl font-bold tracking-tight">{config.brandName}</h1>
            <p className="text-lg opacity-80 mt-2">{config.slogan}</p>
        </header>

        <div className="w-full max-w-md relative">
            {products.length > 1 && (
                <>
                    <button onClick={goToPrevious} className="absolute top-1/2 -left-12 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 rounded-full">
                        <i className="fas fa-chevron-left fa-2x"></i>
                    </button>
                    <button onClick={goToNext} className="absolute top-1/2 -right-12 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 rounded-full">
                        <i className="fas fa-chevron-right fa-2x"></i>
                    </button>
                </>
            )}

            <div className="relative w-full h-[650px] flex items-center justify-center">
                 {products.map((product, index) => (
                    <div
                        key={product.id}
                        className={`absolute w-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                        style={{ transform: `translateX(${(index - currentIndex) * 100}%)`, transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out' }}
                    >
                         {index === currentIndex && <ProductCard product={product} config={config} />}
                    </div>
                ))}
            </div>

            {products.length > 1 && (
                <div className="flex justify-center mt-4">
                    {products.map((_, index) => (
                        <button key={index} onClick={() => setCurrentIndex(index)} className={`h-3 w-3 rounded-full mx-2 transition-colors ${currentIndex === index ? 'bg-white' : 'bg-white/50'}`}></button>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};