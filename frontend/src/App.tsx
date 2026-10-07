import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState<any>(null);
  const [debugData, setDebugData] = useState<string>('Очікування даних...');

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      tg.ready();
      tg.expand();
      
      // Виводимо абсолютно весь об'єкт initDataUnsafe на екран у вигляді тексту
      setDebugData(JSON.stringify(tg.initDataUnsafe, null, 2));
      
      if (tg.initDataUnsafe?.user) {
        setUser(tg.initDataUnsafe.user);
      }
    } else {
      setDebugData("Об'єкт window.Telegram.WebApp не знайдено.");
    }
  }, []);

  return (
    <div style={{ padding: '20px', color: '#ffffff', backgroundColor: '#242424', minHeight: '100vh' }}>
      <h1>Привіт, {user?.first_name || 'Користувач'}! 👋</h1>
      <p>Твій Chat ID: {user?.id || 'Немає даних'}</p>
      
      <button 
        onClick={() => (window as any).Telegram?.WebApp?.close()}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#3390ec', 
          color: '#ffffff', 
          border: 'none', 
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Закрити Mini App
      </button>

      {/* Блок дебагу, який покаже правду */}
      <div style={{ backgroundColor: '#111111', padding: '15px', borderRadius: '8px', overflowX: 'auto' }}>
        <h3 style={{ marginTop: 0, color: '#ef4444' }}>🛠 Debug Data:</h3>
        <pre style={{ fontSize: '12px', margin: 0 }}>
          {debugData}
        </pre>
      </div>
    </div>
  );
}

export default App;