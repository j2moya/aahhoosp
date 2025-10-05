import React, { useState, useEffect } from 'react';
import ProductSlider from './components/ProductSlider';
import AdminPanel from './components/AdminPanel';
import { storageService } from './services/storageService';
import { AppState } from './types';
import { ADMIN_PASSWORD } from './constants';

type Lang = 'es' | 'en';

const DEFAULT_APP_STATE: AppState = {
  brand: {
    name: 'AAHHOO Corp.',
    slogan: {
      es: 'resolver problemas, cumplir deseos y crear nuevos futuros.',
      en: 'solving problems, fulfilling wishes, and creating new futures.',
    },
  },
  pricing: {
    configVersion: 1,
    adminMargin: 20,
    agentMargin: 20,
    promoterCommission: 10,
  },
  products: [
    {
      id: 'prod1',
      name: {
        es: 'Crema para Vitiligo',
        en: 'Vitiligo Cream',
      },
      description: {
        es: 'Tratamiento especializado para la pigmentación de la piel.',
        en: 'Specialized treatment for skin pigmentation.',
      },
      baseCost: 45,
      itemId: 'VIT-CREAM-001',
      paypalEmail: 'paypal-business-email@example.com',
      imageUrl: 'https://aahhoo.com/assets/img/vitiligo-cream.jpg',
      videoUrl: 'https://aahhoo.com/assets/videos/vitiligo-demo.mp4',
    },
    {
      id: 'prod2',
      name: {
        es: 'Suplemento Energético',
        en: 'Energy Supplement',
      },
      description: {
        es: 'Fórmula avanzada para potenciar tu vitalidad diaria.',
        en: 'Advanced formula to boost your daily vitality.',
      },
      baseCost: 30,
      itemId: 'ENERGY-SUP-002',
      paypalEmail: 'paypal-business-email@example.com',
      imageUrl: 'https://aahhoo.com/assets/img/energy-supplement.jpg',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'prod3',
      name: {
        es: 'Kit de Crecimiento Capilar',
        en: 'Hair Growth Kit',
      },
      description: {
        es: 'Solución integral para un cabello más fuerte y saludable.',
        en: 'Comprehensive solution for stronger, healthier hair.',
      },
      baseCost: 65,
      itemId: 'HAIR-GROWTH-003',
      paypalEmail: 'paypal-business-email@example.com',
      imageUrl: 'https://aahhoo.com/assets/img/hair-growth-kit.jpg',
      videoUrl: '',
    },
  ],
  sellers: [],
};

const AdminLogin: React.FC<{ onLogin: (password: string) => void }> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin(password);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-800">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">Acceso de Administrador</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className={`p-2 border rounded w-full mb-4 ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="text-red-500 text-sm mb-4">Contraseña incorrecta.</p>}
        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          Entrar
        </button>
      </form>
    </div>
  );
};


function App() {
  const [appState, setAppState] = useState<AppState>(() => storageService.getItem<AppState>('appState') || DEFAULT_APP_STATE);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setShowAdmin(true);
      } else {
        setShowAdmin(false);
        setIsAdmin(false); // Logout on navigating away
      }
    };
    window.addEventListener('hashchange', checkHash);
    checkHash(); // Initial check
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);
  
  // Save state to local storage whenever it changes
  useEffect(() => {
    storageService.setItem('appState', appState);
  }, [appState]);


  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
    }
  };
  
  const handleLogout = () => {
      setIsAdmin(false);
      window.location.hash = '';
  };

  const handleSave = (newState: AppState) => {
    const stateToSave = {
        ...newState,
        pricing: {
            ...newState.pricing,
            configVersion: newState.pricing.configVersion + 1,
        }
    };
    setAppState(stateToSave);
    // The useEffect above will handle saving to localStorage
    alert('Cambios guardados! La nueva versión de configuración es v' + stateToSave.pricing.configVersion);
  };
  
  if (showAdmin && !isAdmin) {
      return <AdminLogin onLogin={handleLogin} />
  }

  if (showAdmin && isAdmin) {
      return <AdminPanel appState={appState} onSave={handleSave} onLogout={handleLogout} />
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 text-white flex flex-col items-center justify-center font-sans relative p-4">
      <div className="absolute top-4 right-4 z-20">
        <button onClick={() => setLang('es')} className={`px-3 py-1 text-sm rounded-l-md ${lang === 'es' ? 'bg-cyan-500 text-white' : 'bg-white/20 text-white/70'}`}>ES</button>
        <button onClick={() => setLang('en')} className={`px-3 py-1 text-sm rounded-r-md ${lang === 'en' ? 'bg-cyan-500 text-white' : 'bg-white/20 text-white/70'}`}>EN</button>
      </div>

      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{appState.brand.name}</h1>
        <p className="text-white/70 mt-2">{appState.brand.slogan[lang]}</p>
      </header>
      
      <ProductSlider appState={appState} lang={lang} />
    </main>
  );
}

export default App;
