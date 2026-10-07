import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';

function App() {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    try {
      // Намагаємось ініціалізувати Telegram WebApp
      WebApp.ready();
      WebApp.expand();
    } catch (err: any) {
      // Якщо ми не в Telegram і сталася помилка - ловимо її, щоб React не впав
      setError(err.toString());
      console.error("Telegram WebApp Error:", err);
    }
  }, []);

  // Безпечно дістаємо дані (локально це буде undefined)
  const user = WebApp.initDataUnsafe?.user;

  return (
    <div style={{ 
      padding: '20px', 
      // ВАЖЛИВО: додаємо запасний колір (#ffffff) на випадок, якщо змінної Telegram немає
      color: 'var(--tg-theme-text-color, #ffffff)', 
      backgroundColor: 'var(--tg-theme-bg-color, #242424)', 
      height: '100vh' 
    }}>
      {/* Виводимо помилку червоним, якщо вона є, для зручності дебагу */}
      {error && (
  <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '10px', borderRadius: '8px' }}>
    <b>Помилка ініціалізації:</b> <br/>
    <code>{error}</code>
  </div>
)}

      <h1>Привіт, {user?.first_name || 'Користувач'}! 👋</h1>
      <p>Твій Chat ID: {user?.id || 'Не знайдено (ти в браузері)'}</p>
      
      <button 
        onClick={() => WebApp.close()}
        style={{ 
          padding: '10px 20px', 
          marginTop: '20px', 
          // Запасні кольори для кнопки
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