import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Повідомляємо Telegram, що ми готові
    WebApp.ready();
    WebApp.expand();
  }, []);

  // Тепер безпечно дістаємо дані користувача
  const user = WebApp.initDataUnsafe?.user;

  return (
    <div style={{ 
      padding: '20px', 
      color: 'var(--tg-theme-text-color)', 
      backgroundColor: 'var(--tg-theme-bg-color)', 
      height: '100vh' 
    }}>
      <h1>Привіт, {user?.first_name || 'Користувач'}! 👋</h1>
      <p>Твій Chat ID: {user?.id || 'Не знайдено'}</p>
      
      <button 
        onClick={() => WebApp.close()}
        style={{ 
          padding: '10px 20px', 
          marginTop: '20px', 
          backgroundColor: 'var(--tg-theme-button-color)', 
          color: 'var(--tg-theme-button-text-color)', 
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