import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App.tsx';
import store from './store.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Auth0Provider
        domain={import.meta.env.VITE_DOMAIN}
        clientId={import.meta.env.VITE_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin + '/callback',
          audience: import.meta.env.VITE_AUDIENCE,
        }}
        cacheLocation="localstorage"
      >
        <Provider store={store}>
          <App />
        </Provider>
      </Auth0Provider>
    </React.StrictMode>
  );
}