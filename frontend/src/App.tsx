import { useEffect, useState } from 'react';

// Дістаємо нативний об'єкт напряму, обходячи обмеження TypeScript
const WebApp = (window as any).Telegram?.WebApp;

function App() {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      if (WebApp) {
        WebApp.ready();
        WebApp.expand();
      } else {
        setError("Об'єкт Telegram не знайдено (ти в браузері)");
      }
    } catch (err: any) {
      setError(err.toString());
      console.error("Telegram WebApp Error:", err);
    }
  }, []);

  // Безпечно дістаємо дані користувача
  const user = WebApp?.initDataUnsafe?.user;

  return (
    <div style={{ 
      padding: '20px', 
      color: 'var(--tg-theme-text-color, #ffffff)', 
      backgroundColor: 'var(--tg-theme-bg-color, #242424)', 
      height: '100vh' 
    }}>
      {error && (
        <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '10px', borderRadius: '8px' }}>
          <b>Помилка:</b> <br/>
          <code>{error}</code>
        </div>
      )}

      <h1>Привіт, {user?.first_name || 'Користувач'}! 👋</h1>
      <p>Твій Chat ID: {user?.id || 'Немає даних'}</p>
      
      <button 
        onClick={() => WebApp?.close()}
        style={{ 
          padding: '10px 20px', 
          marginTop: '20px', 
          backgroundColor: 'var(--tg-theme-button-color, #3390ec)', 
          color: 'var(--tg-theme-button-text-color, #ffffff)', 
          border: 'none', 
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Закрити Mini App
      </button>
    </div>
  );
}

export default App;