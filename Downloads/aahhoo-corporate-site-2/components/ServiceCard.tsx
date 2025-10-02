import React, { useState } from 'react';
import { COMPANY_INFO } from '../constants.ts';
import type { Service } from '../types.ts';

interface ServiceCardProps {
  service: Service;
  callToAction: string;
}

// Fix: Explicitly type ServiceCard as React.FC<ServiceCardProps> to ensure TypeScript recognizes it as a React component that can receive a 'key' prop.
export const ServiceCard: React.FC<ServiceCardProps> = ({ service, callToAction }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles: { [key: string]: React.CSSProperties } = {
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '1.4rem',
      fontWeight: 600,
      color: '#0D3D56',
      marginBottom: '1rem',
    },
    description: {
      color: '#495057',
      marginBottom: '1.5rem',
      flexGrow: 1,
    },
    button: {
      display: 'inline-block',
      backgroundColor: '#176B87',
      color: 'white',
      padding: '0.6rem 1.5rem',
      borderRadius: '20px',
      textDecoration: 'none',
      fontWeight: 600,
      transition: 'background-color 0.2s ease-in-out',
      textAlign: 'center',
      marginTop: 'auto',
    },
  };

  const handleButtonHover = (e: React.MouseEvent<HTMLAnchorElement>, isHovering: boolean) => {
    e.currentTarget.style.backgroundColor = isHovering ? '#0D3D56' : '#176B87';
  };

  const whatsappNumber = COMPANY_INFO.whatsapp.replace(/\D/g, '');
  const message = encodeURIComponent(`Hola, quisiera saber más sobre: ${service.title}`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div 
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 style={styles.title}>{service.title}</h3>
      <p style={styles.description}>{service.description}</p>
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.button}
        onMouseEnter={(e) => handleButtonHover(e, true)}
        onMouseLeave={(e) => handleButtonHover(e, false)}
      >
        {callToAction}
      </a>
    </div>
  );
};