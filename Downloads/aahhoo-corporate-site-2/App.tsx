import React, { useState } from 'react';
import {
    AddressIcon, ArticleIcon, AudioIcon, BookIcon, CalendarIcon, FacebookIcon, FaxIcon, GlobeIcon,
    InstagramIcon, MailIcon, PhoneIcon, PodcastIcon, ReelAdminIcon, ReelIcon, StreamIcon, TikTokIcon,
    UsersIcon, VideoIcon, WebIcon, WhatsAppIcon, XIcon, YouTubeIcon
} from './components/icons.tsx';
import { LanguageSwitcher } from './components/LanguageSwitcher.tsx';
import { Modal } from './components/Modal.tsx';
import { ServiceCard } from './components/ServiceCard.tsx';
import { COMPANY_INFO, content, MEXICO_LOCATIONS } from './constants.ts';
import { useWindowSize } from './hooks/useWindowSize.ts';
import { Language } from './types.ts';

const Icon = ({ name }: { name: string }) => {
    const icons: { [key: string]: React.ReactNode } = {
        ArticleIcon: <ArticleIcon />,
        ReelIcon: <ReelIcon />,
        ReelAdminIcon: <ReelAdminIcon />,
        VideoIcon: <VideoIcon />,
        AudioIcon: <AudioIcon />,
        PodcastIcon: <PodcastIcon />,
        YouTubeIcon: <YouTubeIcon />,
        XIcon: <XIcon />,
        FacebookIcon: <FacebookIcon />,
        InstagramIcon: <InstagramIcon />,
        TikTokIcon: <TikTokIcon />,
    };
    return <>{icons[name] || null}</>;
};

export const App = () => {
  const [language, setLanguage] = useState<Language>('es');
  const [loginHover, setLoginHover] = useState(false);
  const [registerHover, setRegisterHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = content[language];
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const styles: {[key: string]: React.CSSProperties | {[key: string]: React.CSSProperties}} = {
    app: {
      fontFamily: "'Lato', sans-serif",
      backgroundColor: '#f8f9fa',
      color: '#343a40',
      lineHeight: 1.7,
    },
    header: {
      backgroundColor: 'white',
      padding: isMobile ? '1rem' : '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #dee2e6',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      gap: '1rem',
    },
    logo: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: isMobile ? '1.5rem' : '2rem',
      fontWeight: 700,
      color: '#0D3D56',
      textDecoration: 'none',
    },
    headerActions: {
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '0.75rem' : '1.5rem',
    },
    authButton: {
        padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1.2rem',
        borderRadius: '20px',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: isMobile ? '0.8rem' : '0.9rem',
        textAlign: 'center',
        transition: 'all 0.2s ease-in-out',
        whiteSpace: 'nowrap',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isMobile ? '2rem 1rem' : '4rem 2rem',
    },
    hero: {
      textAlign: 'center',
      padding: isMobile ? '3rem 0' : '5rem 0',
      background: 'linear-gradient(135deg, #0D3D56 0%, #176B87 100%)',
      color: 'white',
    },
    heroTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: isMobile ? '2.5rem' : '4rem',
      fontWeight: 700,
      margin: '0 0 1rem 0',
    },
    heroSubtitle: {
      fontSize: isMobile ? '1.1rem' : '1.25rem',
      fontWeight: 300,
      maxWidth: '800px',
      margin: '0 auto',
      opacity: 0.9,
    },
    section: {
      marginBottom: '4rem',
    },
    sectionTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontWeight: 600,
      color: '#0D3D56',
      textAlign: 'center',
      marginBottom: '2.5rem',
      position: 'relative',
    },
    sectionSubtitle: {
        textAlign: 'center',
        fontSize: '1.1rem',
        maxWidth: '900px',
        margin: '-1.5rem auto 2.5rem auto',
        color: '#495057',
    },
    sectionTitleDecorator: {
        content: '""',
        position: 'absolute',
        bottom: '-10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80px',
        height: '4px',
        backgroundColor: '#176B87',
        borderRadius: '2px',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
    },
    locationsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2rem',
    },
    locationCard: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    locationCity: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '1.4rem',
      fontWeight: 600,
      color: '#0D3D56',
      margin: '0 0 1rem 0',
    },
    locationAddressList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    locationAddressItem: {
      marginBottom: '0.75rem',
      color: '#495057',
      borderLeft: '3px solid #176B87',
      paddingLeft: '1rem',
    },
    seeMoreLink: {
        background: 'none',
        border: 'none',
        color: '#176B87',
        textDecoration: 'underline',
        cursor: 'pointer',
        padding: '0.5rem 0',
        marginTop: '1rem',
        fontWeight: 600,
        fontFamily: "'Lato', sans-serif",
        fontSize: '1rem',
        display: 'block',
    },
    modalLocationList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    modalLocationItem: {
        padding: '1rem',
        borderBottom: '1px solid #f1f3f5',
    },
    modalLocationProvider: {
        display: 'block',
        marginTop: '0.25rem',
        fontSize: '0.85rem',
        color: '#6c757d',
        fontStyle: 'italic',
    },
    associatesGrid: {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
    },
    associateCard: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        textAlign: 'center',
    },
    associateName: {
        fontWeight: 600,
        color: '#0D3D56',
        margin: '0 0 0.25rem 0',
    },
    associateLocation: {
        color: '#495057',
        margin: 0,
        fontSize: '0.9rem',
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '2rem',
      backgroundColor: 'white',
      padding: '2.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
    },
    contactText: {
      fontSize: '1rem',
      color: '#495057',
    },
    contactLink: {
        color: '#176B87',
        textDecoration: 'none',
        fontWeight: 600,
    },
    phoneNumbersContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    footer: {
      backgroundColor: '#0D3D56',
      color: 'white',
      textAlign: 'center',
      padding: '2rem',
      fontSize: '0.9rem',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    aboutText: {
        textAlign: 'center',
        fontSize: '1.1rem',
        maxWidth: '900px',
        margin: '0 auto',
        color: '#495057',
    },
    moreLinksSubtitle: {
        textAlign: 'center',
        fontSize: '1.1rem',
        maxWidth: '900px',
        margin: '0 auto 2.5rem auto',
        color: '#495057',
    },
    externalLinksGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '1.5rem',
      marginTop: '2.5rem',
    },
    moreLinksGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '1.5rem',
    },
    externalLinkCard: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    },
  };

  const loginButtonStyle: React.CSSProperties = {
    ...styles.authButton,
    backgroundColor: loginHover ? '#176B87' : '#0D3D56',
    color: 'white',
  };

  const registerButtonStyle: React.CSSProperties = {
    ...styles.authButton,
    border: `2px solid #0D3D56`,
    backgroundColor: registerHover ? '#0D3D56' : 'transparent',
    color: registerHover ? 'white' : '#0D3D56',
  };

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>, isHovering: boolean) => {
    e.currentTarget.style.transform = isHovering ? 'translateY(-3px)' : 'translateY(0)';
    e.currentTarget.style.boxShadow = isHovering ? '0 8px 16px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.05)';
  };

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <a href={`https://${COMPANY_INFO.website}`} style={styles.logo}>AAHHOO</a>
        <div style={styles.headerActions}>
            <a 
                href={COMPANY_INFO.registerUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={registerButtonStyle}
                onMouseEnter={() => setRegisterHover(true)}
                onMouseLeave={() => setRegisterHover(false)}
            >
                {t.registerText}
            </a>
            <a 
                href={COMPANY_INFO.memberUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={loginButtonStyle}
                onMouseEnter={() => setLoginHover(true)}
                onMouseLeave={() => setLoginHover(false)}
            >
                {t.loginText}
            </a>
            <LanguageSwitcher language={language} setLanguage={setLanguage} />
        </div>
      </header>

      <main>
        <section style={styles.hero}>
          <div style={{...styles.container as React.CSSProperties, padding: isMobile ? '2rem 1rem' : '4rem 2rem' }}>
            <h1 style={styles.heroTitle}>{t.tagline}</h1>
            <p style={styles.heroSubtitle}>{t.heroSubtitle}</p>
          </div>
        </section>

        <div style={styles.container}>
            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    {t.aboutTitle}
                    <span style={styles.sectionTitleDecorator}></span>
                </h2>
                <p style={styles.aboutText}>{t.aboutText}</p>
            </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              {t.servicesTitle}
              <span style={styles.sectionTitleDecorator}></span>
            </h2>
            <div style={styles.servicesGrid}>
              {t.services.map((service, index) => (
                <ServiceCard key={index} service={service} callToAction={t.callToAction} />
              ))}
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              {t.locationsTitle}
              <span style={styles.sectionTitleDecorator}></span>
            </h2>
            <p style={styles.sectionSubtitle}>{t.locationsSubtitle}</p>
            <div style={styles.locationsGrid}>
              {t.locations.map((location, index) => (
                <div key={index} style={styles.locationCard}>
                    <h3 style={styles.locationCity}><GlobeIcon /> {location.city}</h3>
                    <ul style={styles.locationAddressList}>
                        {location.addresses.map((address, addrIndex) => (
                            <li key={addrIndex} style={styles.locationAddressItem}>{address}</li>
                        ))}
                    </ul>
                    {location.city === 'Mexico City' && (
                        <button onClick={() => setIsModalOpen(true)} style={styles.seeMoreLink as React.CSSProperties}>
                            {t.locationsMexicoLink}
                        </button>
                    )}
                </div>
              ))}
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              {t.associatesTitle}
              <span style={styles.sectionTitleDecorator}></span>
            </h2>
            <p style={styles.sectionSubtitle}>{t.associatesSubtitle}</p>
            <div style={styles.associatesGrid}>
                {t.associates.map((associate, index) => (
                    <div key={index} style={styles.associateCard}>
                        <p style={styles.associateName}><UsersIcon /> {associate.name}</p>
                        <p style={styles.associateLocation}>{associate.location}</p>
                    </div>
                ))}
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              {t.externalLinksTitle}
              <span style={styles.sectionTitleDecorator}></span>
            </h2>
             <div style={styles.externalLinksGrid}>
                <a 
                    href={COMPANY_INFO.streamUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={styles.externalLinkCard}
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                    <StreamIcon />
                    <div>
                        <h3 style={{ margin: 0, fontFamily: "'Poppins', sans-serif", color: '#0D3D56' }}>{t.streamTitle}</h3>
                        <p style={{ margin: 0, color: '#495057' }}>{t.streamText}</p>
                    </div>
                </a>
                <a 
                    href={COMPANY_INFO.booksUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={styles.externalLinkCard}
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                    <BookIcon />
                    <div>
                        <h3 style={{ margin: 0, fontFamily: "'Poppins', sans-serif", color: '#0D3D56' }}>{t.booksTitle}</h3>
                        <p style={{ margin: 0, color: '#495057' }}>{t.booksText}</p>
                    </div>
                </a>
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              {t.moreLinksTitle}
              <span style={styles.sectionTitleDecorator}></span>
            </h2>
            <p style={styles.moreLinksSubtitle}>{t.moreLinksSubtitle}</p>
            <div style={styles.moreLinksGrid}>
              {t.moreLinks.map((link, index) => (
                <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={styles.externalLinkCard}
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                    <Icon name={link.icon} />
                    <div>
                        <h3 style={{ margin: 0, fontFamily: "'Poppins', sans-serif", color: '#0D3D56', fontSize: '1.1rem' }}>{link.title}</h3>
                        <p style={{ margin: 0, color: '#495057', fontSize: '0.9rem' }}>{link.description}</p>
                    </div>
                </a>
              ))}
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              {t.exploreMoreTitle}
              <span style={styles.sectionTitleDecorator}></span>
            </h2>
            <div style={styles.moreLinksGrid}>
              {t.exploreMoreLinks.map((link, index) => (
                <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={styles.externalLinkCard}
                    onMouseEnter={(e) => handleLinkHover(e, true)}
                    onMouseLeave={(e) => handleLinkHover(e, false)}
                >
                    <Icon name={link.icon} />
                    <div>
                        <h3 style={{ margin: 0, fontFamily: "'Poppins', sans-serif", color: '#0D3D56', fontSize: '1.1rem' }}>{link.title}</h3>
                        <p style={{ margin: 0, color: '#495057', fontSize: '0.9rem' }}>{link.description}</p>
                    </div>
                </a>
              ))}
            </div>
          </section>

          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              {t.contactTitle}
              <span style={styles.sectionTitleDecorator}></span>
            </h2>
            <div style={styles.contactGrid}>
              <div style={styles.contactInfo}>
                <div style={styles.contactItem}><AddressIcon /><span style={styles.contactText}>{COMPANY_INFO.address}</span></div>
                <div style={styles.contactItem}>
                    <PhoneIcon />
                    <div style={styles.phoneNumbersContainer}>
                        <a href={`tel:${COMPANY_INFO.phone}`} style={{...styles.contactText, ...styles.contactLink}}>{COMPANY_INFO.phone} (USA)</a>
                        <a href={`tel:${COMPANY_INFO.mexicoPhone}`} style={{...styles.contactText, ...styles.contactLink}}>{COMPANY_INFO.mexicoPhone} (México)</a>
                    </div>
                </div>
                <div style={styles.contactItem}><FaxIcon /><span style={styles.contactText}>{COMPANY_INFO.fax}</span></div>
                <div style={styles.contactItem}><MailIcon /><a href={`mailto:${COMPANY_INFO.email}`} style={{...styles.contactText, ...styles.contactLink}}>{COMPANY_INFO.email}</a></div>
                <div style={styles.contactItem}><WebIcon /><a href={`https://${COMPANY_INFO.website}`} target="_blank" rel="noopener noreferrer" style={{...styles.contactText, ...styles.contactLink}}>{COMPANY_INFO.website}</a></div>
              </div>
              <div style={styles.contactInfo}>
                <div style={styles.contactItem}>
                    <WhatsAppIcon />
                    <a href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{...styles.contactText, ...styles.contactLink}}>{COMPANY_INFO.whatsapp}</a>
                </div>
                <div style={styles.contactItem}>
                    <CalendarIcon />
                    <a href={COMPANY_INFO.calendly} target="_blank" rel="noopener noreferrer" style={{...styles.contactText, ...styles.contactLink}}>{t.bookingLink}</a>
                </div>
                 <p style={{...styles.contactText, fontStyle: 'italic', marginTop: '1rem'}}>{t.investmentPrice}</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t.locationsMexicoModalTitle}
      >
        <ul style={styles.modalLocationList as React.CSSProperties}>
          {MEXICO_LOCATIONS.map((loc, index) => (
            <li key={index} style={styles.modalLocationItem as React.CSSProperties}>
              <strong>{loc.city}</strong> - {loc.address}
              <span style={styles.modalLocationProvider as React.CSSProperties}>{loc.provider}</span>
            </li>
          ))}
        </ul>
      </Modal>

      <footer style={styles.footer}>
        <p>&copy; {new Date().getFullYear()} AAHHOO Corporation. {t.footerRights}.</p>
        <p>
          <a href={`https://${COMPANY_INFO.website}`} style={styles.link}>www.AAHHOO.com</a>
        </p>
      </footer>
    </div>
  );
};
