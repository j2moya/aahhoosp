import React, { useState, useEffect, useCallback } from 'react';
import { loadStateFromStorage, saveStateToStorage } from './services/storageService';
import { AppState } from './types';
import AdminPanel from './components/AdminPanel';
import ProductSlider from './components/ProductSlider';
import { PayPalIcon, WhatsAppIcon } from './components/Icons';

function App() {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [isAdminVisible, setIsAdminVisible] = useState(false);

  useEffect(() => {
    const state = loadStateFromStorage();
    setAppState(state);
    // Add a listener to toggle admin panel with a key combination
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsAdminVisible(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSave = useCallback(() => {
    if (appState) {
      saveStateToStorage(appState);
      alert('Changes saved!');
      setIsAdminVisible(false);
    }
  }, [appState]);

  if (!appState) {
    return <div className="flex justify-center items-center h-screen"><div>Loading Store...</div></div>;
  }
  
  const { title, subtitle, products, businessDetails } = appState;

  return (
    <div className="font-sans text-gray-800 p-4 sm:p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          <p className="text-lg md:text-xl text-gray-600 mt-2">{subtitle}</p>
        </header>

        <main>
          <ProductSlider products={products} />
        </main>

        <footer className="text-center mt-12 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold">Contact & Payment</h3>
          <p className="mt-2 text-gray-600">Contact us or place an order via WhatsApp. Payments are accepted through PayPal.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
            <a href={`https://wa.me/${businessDetails.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold">
              <WhatsAppIcon className="w-8 h-8" />
              <span>{businessDetails.whatsapp}</span>
            </a>
            <a href={`https://paypal.me/${businessDetails.paypal}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-800 hover:text-blue-900 font-semibold">
              <PayPalIcon className="w-8 h-8" />
              <span>{businessDetails.paypal}</span>
            </a>
          </div>
        </footer>
      </div>

      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setIsAdminVisible(!isAdminVisible)}
          title="Open Admin Panel (Ctrl+Shift+A)"
          className="bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {isAdminVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-4 z-40 overflow-y-auto">
          <div className="relative bg-white w-full max-w-2xl rounded-lg mt-4 mb-4">
             <button onClick={() => setIsAdminVisible(false)} className="absolute top-2 right-2 text-2xl font-bold z-10 text-gray-500 hover:text-gray-800">&times;</button>
             <AdminPanel 
               appState={appState}
               onStateChange={setAppState}
               onSave={handleSave}
             />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
