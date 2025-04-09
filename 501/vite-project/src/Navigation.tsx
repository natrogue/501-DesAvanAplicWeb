import React from 'react';
import Button from './class2/A01663909/button';

// Definimos las páginas a las que podemos navegar - add 'form' type
type Page = 'home' | 'login' | 'blank' | 'navigation' | 'form';

interface NavigationProps {
  setCurrentPage: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ setCurrentPage }) => {
  return (
    <div
      style={{
        maxWidth: '500px',
        margin: '60px auto',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: '#fff5f2',
        boxShadow: '0 8px 20px rgba(255, 111, 97, 0.15)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#ff6f61', marginBottom: '30px' }}>Navegación</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Button label="Ir a Login" onClick={() => setCurrentPage('login')} />
        <Button label="Ir a Formulario" onClick={() => setCurrentPage('form')} />
        <div style={{ marginTop: '20px' }}>
          <Button label="Volver al Inicio" onClick={() => setCurrentPage('home')} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;