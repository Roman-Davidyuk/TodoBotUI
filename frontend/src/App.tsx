import { useEffect, useState } from 'react';

function App() {
  const [error, setError] = useState<string>('');
  // Створюємо стан для збереження даних користувача
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Шукаємо об'єкт Telegram
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      try {
        tg.ready();
        tg.expand();
        
        // Зберігаємо дані в стан React, щоб екран оновився
        if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
          setUser(tg.initDataUnsafe.user);
        } else {
          setError("Об'єкт Telegram є, але дані користувача порожні (initDataUnsafe.user)");
        }
      } catch (err: any) {
        setError(err.toString());
      }
    } else {
      setError("Telegram WebApp API не знайдено.");
    }
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      color: 'var(--tg-theme-text-color, #ffffff)', 
      backgroundColor: 'var(--tg-theme-bg-color, #242424)', 
      height: '100vh' 
    }}>
      {error && (
        <div style={{ backgroundColor: '#ef4444', color: 'white', padding: '10px', borderRadius: '8px' }}>
          <b>Помилка або статус:</b> <br/>
          <code>{error}</code>
        </div>
      )}

      {/* Якщо user є - показуємо його дані, інакше показуємо фолбек */}
      <h1>Привіт, {user?.first_name || 'Користувач'}! 👋</h1>
      <p>Твій Chat ID: {user?.id || 'Немає даних'}</p>
      
      <button 
        onClick={() => (window as any).Telegram?.WebApp?.close()}
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