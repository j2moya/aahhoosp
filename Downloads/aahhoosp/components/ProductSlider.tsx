import React, { useState } from 'react';
import { Product, AppState } from '../types';
import { usePricing } from '../hooks/usePricing';
import { WHATSAPP_NUMBER } from '../constants';
import { ArrowLeftIcon, ArrowRightIcon, ImageIcon, VideoIcon, PayPalIcon, WhatsAppIcon } from './Icons';

type Lang = 'es' | 'en';

const StaleLinkNotification: React.FC<{ lang: Lang, tier: string | null }> = ({ lang, tier }) => {
    const texts: { [key in Lang]: any } = {
        es: {
            title: 'Enlace Desactualizado',
            message: `Los precios han sido actualizados recientemente. Por favor, contacta a tu ${tier?.toLowerCase() === 'promoter' ? 'promotor' : 'agente'} para obtener el enlace más reciente y ver las nuevas ofertas.`,
            contact: 'Contactar al Administrador'
        },
        en: {
            title: 'Link Outdated',
            message: `Prices have been updated recently. Please contact your ${tier?.toLowerCase() === 'promoter' ? 'promoter' : 'agent'} to get the latest link and see the new offers.`,
            contact: 'Contact Administrator'
        }
    };
    const t = texts[lang];

    return (
        <div className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-lg max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">{t.title}</h3>
            <p className="text-white/80 mb-6">{t.message}</p>
            <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lang === 'es' ? 'Hola, tengo un enlace de compra desactualizado.' : 'Hello, I have an outdated purchase link.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
                <WhatsAppIcon />
                {t.contact}
            </a>
        </div>
    );
};


const ProductCard: React.FC<{ product: Product; appState: AppState; lang: Lang, onShowMedia: (type: 'image' | 'video', url: string) => void }> = ({ product, appState, lang, onShowMedia }) => {
    const { finalPrice, pvp, tier, ref, isStale } = usePricing(product.baseCost, appState);

    const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

    const whatsAppMessage = lang === 'es'
        ? `Hola, estoy interesado/a en ${product.name.es} que vi a través de un enlace de ${tier}. El ID del producto es ${product.itemId}.`
        : `Hello, I'm interested in ${product.name.en} which I saw through a ${tier} link. The product ID is ${product.itemId}.`;

    const customPaypalField = `product:${product.itemId},seller:${ref || 'admin'}`;
    const paypalLink = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${encodeURIComponent(product.paypalEmail)}&item_name=${encodeURIComponent(product.name[lang])}&item_number=${encodeURIComponent(product.itemId)}&amount=${finalPrice.toFixed(2)}&currency_code=USD&custom=${encodeURIComponent(customPaypalField)}`;
    
    if (isStale) {
        return <StaleLinkNotification lang={lang} tier={tier} />;
    }

    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md text-center text-white flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2">{product.name[lang]}</h2>
            <p className="text-white/80 mb-4 h-12">{product.description[lang]}</p>

            <div className="flex space-x-4 mb-4">
                {product.imageUrl && (
                    <button onClick={() => onShowMedia('image', product.imageUrl!)} className="text-white/70 hover:text-white transition-colors"><ImageIcon className="w-8 h-8" /></button>
                )}
                {product.videoUrl && (
                    <button onClick={() => onShowMedia('video', product.videoUrl!)} className="text-white/70 hover:text-white transition-colors"><VideoIcon className="w-8 h-8" /></button>
                )}
            </div>
            
            <p className="text-lg text-red-400 line-through opacity-70">P.V.P. {formatCurrency(pvp)}</p>
            <p className="text-6xl font-extrabold text-cyan-400 my-2">{formatCurrency(finalPrice)}</p>
            <p className="text-sm text-white/60 mb-6">USD</p>

            <a href={paypalLink} target="_blank" rel="noopener noreferrer" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg mb-3 flex items-center justify-center transition-colors shadow-lg">
                <PayPalIcon /> {lang === 'es' ? 'Comprar ahora con PayPal' : 'Buy now with PayPal'}
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppMessage)}`} target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors shadow-lg">
                <WhatsAppIcon /> {lang === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
            </a>
            <p className="text-xs text-white/50 mt-4">ItemID: {product.itemId}</p>
        </div>
    );
};

const MediaModal: React.FC<{ media: { type: 'image' | 'video'; url: string } | null; onClose: () => void; }> = ({ media, onClose }) => {
    if (!media) return null;

    const isYoutube = media.url.includes('youtube.com') || media.url.includes('youtu.be');
    let videoSrc = media.url;
    if (isYoutube) {
        const videoIdMatch = media.url.match(/(?:v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (videoId) {
            videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-gray-900 rounded-lg shadow-2xl p-4 max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                {media.type === 'image' ? (
                    <img src={media.url} alt="Product Media" className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
                ) : (
                    <div className="aspect-video">
                        {isYoutube ? (
                             <iframe className="w-full h-full" src={videoSrc} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        ) : (
                            <video src={media.url} controls autoPlay className="w-full h-full rounded-lg">Your browser does not support the video tag.</video>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProductSlider: React.FC<{ appState: AppState; lang: Lang; }> = ({ appState, lang }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [media, setMedia] = useState<{type: 'image' | 'video', url: string} | null>(null);

    const products = appState.products;

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
    
    const handleShowMedia = (type: 'image' | 'video', url: string) => {
        setMedia({ type, url });
    };

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
             <div className="w-full max-w-5xl flex items-center justify-center">
                <button onClick={goToPrevious} className="absolute left-0 md:left-4 text-white/50 hover:text-white transition-opacity p-4 z-10">
                    <ArrowLeftIcon className="w-10 h-10" />
                </button>
                
                {products.length > 0 ? (
                    <ProductCard product={products[currentIndex]} appState={appState} lang={lang} onShowMedia={handleShowMedia} />
                ) : (
                    <div className="text-center text-white">No products available.</div>
                )}


                <button onClick={goToNext} className="absolute right-0 md:right-4 text-white/50 hover:text-white transition-opacity p-4 z-10">
                    <ArrowRightIcon className="w-10 h-10" />
                </button>
            </div>
            <div className="flex justify-center mt-8">
                {products.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full mx-2 transition-colors ${currentIndex === index ? 'bg-cyan-400' : 'bg-white/30'}`}></button>
                ))}
            </div>

            <MediaModal media={media} onClose={() => setMedia(null)} />
        </div>
    );
};

export default ProductSlider;
