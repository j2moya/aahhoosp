import React from 'react';
import type { Language } from '../types.ts';

export const LanguageSwitcher = ({ language, setLanguage }: { language: Language; setLanguage: (lang: Language) => void; }) => {
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f1f3f5',
      borderRadius: '20px',
      padding: '4px',
    },
    button: {
      border: 'none',
      backgroundColor: 'transparent',
      padding: '0.5rem 1rem',
      cursor: 'pointer',
      borderRadius: '16px',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      fontSize: '0.9rem',
    },
  };

  const getButtonStyle = (lang: Language) => {
    const isActive = language === lang;
    return {
      ...styles.button,
      backgroundColor: isActive ? '#0D3D56' : 'transparent',
      color: isActive ? 'white' : '#495057',
    };
  };

  return (
    <div style={styles.container}>
      <button style={getButtonStyle('es')} onClick={() => setLanguage('es')}>ES</button>
      <button style={getButtonStyle('en')} onClick={() => setLanguage('en')}>EN</button>
    </div>
  );
};