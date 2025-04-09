import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './class2/A01663909/button.tsx'
import Login from './class2/A01663909/login'
import BlankPage from './class3/A01663909/class3'
import Navigation from './Navigation'
import TravelRequestForm from './class3/A01663909/form'

// Updated Page type to include the form page
type Page = 'home' | 'login' | 'blank' | 'navigation' | 'form';

function App() {
  const [count, setCount] = useState(0)
  // Estado para controlar qué página se muestra
  const [currentPage, setCurrentPage] = useState<Page>('home')

  // Renderizar la página correspondiente según el estado
  const renderPage = () => {
    switch (currentPage) {
      case 'navigation':
        return <Navigation setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />; // Pass setCurrentPage to Login
      case 'blank':
        return <BlankPage />;
      case 'form':
        return <TravelRequestForm />; // Add case for the form component
      default:
        return (
          <>
            <div>
              <a href="https://vite.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              {/* Solo un botón que lleva al componente de navegación */}
              <Button label="Ir a Navegación" onClick={() => setCurrentPage('navigation')} />
            </div>
          </>
        );
    }
  };

  return (
    <>
      {renderPage()}
      {/* Agregar botón de regreso si no estamos en la página principal ni en navegación */}
      {currentPage !== 'home' && currentPage !== 'navigation' && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button label="Volver a Navegación" onClick={() => setCurrentPage('navigation')} />
        </div>
      )}
    </>
  )
}

export default App