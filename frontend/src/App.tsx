import { useEffect } from 'react';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        close: () => void;
        initDataUnsafe?: {
          user?: {
            first_name?: string;
            id?: number;
          };
        };
      };
    };
  }
}

function App() {
  useEffect(() => {
    // Повідомляємо Telegram, що застосунок готовий до відображення
    window.Telegram?.WebApp.ready();

    // Можемо розширити застосунок на всю висоту екрана
    window.Telegram?.WebApp.expand();
  }, []);

  // Отримуємо дані користувача з Telegram (імя, ChatId тощо)
  const user = window.Telegram?.WebApp.initDataUnsafe?.user;

  return (
    <div style={{ padding: '20px', color: 'var(--tg-theme-text-color)', backgroundColor: 'var(--tg-theme-bg-color)', height: '100vh' }}>
      <h1>Привіт, {user?.first_name || 'Користувач'}! 👋</h1>
      <p>Твій Chat ID: {user?.id}</p>
      
      <button 
        onClick={() => window.Telegram?.WebApp.close()}
        style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)', border: 'none', borderRadius: '8px' }}
      >
        Закрити Mini App
      </button>
    </div>
  );
}

export default App;