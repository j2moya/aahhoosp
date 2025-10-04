import React, { useState, useEffect } from 'react';
import { ProductSlider } from './components/ProductSlider';
import AdminPanel from './components/AdminPanel';
import { AppState } from './types';
import { loadStateFromStorage, saveStateToStorage } from './services/storageService';
import { ADMIN_PASSWORD } from './constants';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(loadStateFromStorage());
  const [isAdmin, setIsAdmin] = useState<boolean>(sessionStorage.getItem('isAdmin') === 'true');
  
  // State to manage the current route based on hash
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  const isAdminRoute = hash === '#admin';

  useEffect(() => {
    sessionStorage.setItem('isAdmin', String(isAdmin));
  }, [isAdmin]);

  const handleSave = (newState: AppState) => {
    setAppState(newState);
    saveStateToStorage(newState);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    // Redirect to home page by clearing the hash
    window.location.hash = '';
  };
  
  useEffect(() => {
    if (isAdminRoute && !isAdmin) {
      const password = prompt('Introduce la contraseña de administrador:');
      if (password === ADMIN_PASSWORD) {
        setIsAdmin(true);
      } else {
        if (password !== null) { // User didn't click cancel
            alert('Contraseña incorrecta.');
        }
        window.location.hash = '';
      }
    }
  }, [isAdminRoute, isAdmin]);

  if (isAdminRoute) {
    if (isAdmin) {
      return (
        <AdminPanel 
          initialState={appState} 
          onSave={handleSave} 
          onLogout={handleLogout} 
        />
      );
    }
    // Show a simple loading/authentication screen while prompt is up
    return (
      <div className="min-h-screen w-screen bg-gray-200 flex items-center justify-center">
        <p className="text-gray-600">Autenticando...</p>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen bg-gradient-to-br from-slate-900 to-sky-800 font-sans overflow-hidden">
      <ProductSlider products={appState.products} config={appState.config} />
    </main>
  );
};

export default App;
