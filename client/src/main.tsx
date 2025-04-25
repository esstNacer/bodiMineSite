// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import { ProProvider } from './components/ProContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ ici uniquement */}
      <UserProvider>
      <ProProvider>
        <App />
        </ProProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
