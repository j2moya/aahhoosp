import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const styles: { [key: string]: React.CSSProperties } = {
    backdrop: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 1.5rem',
      borderBottom: '1px solid #dee2e6',
      fontFamily: "'Poppins', sans-serif",
    },
    title: {
      margin: 0,
      fontSize: '1.5rem',
      color: '#0D3D56',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      fontWeight: 300,
      cursor: 'pointer',
      color: '#6c757d',
      lineHeight: 1,
    },
    body: {
      padding: '1.5rem',
      overflowY: 'auto',
    },
  };

  return (
    <div style={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <header style={styles.header}>
          <h2 id="modal-title" style={styles.title}>{title}</h2>
          <button style={styles.closeButton} onClick={onClose} aria-label="Close modal">&times;</button>
        </header>
        <div style={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
};