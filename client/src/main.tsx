import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import thunk, { ThunkMiddleware } from 'redux-thunk';
import {Provider} from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, legacy_createStore as createStore, StoreEnhancer } from 'redux';

import Reducers from './components/reducers/index.ts';
import App from './App.tsx'

const store = createStore(
  Reducers,
  composeWithDevTools(applyMiddleware(thunk as unknown as ThunkMiddleware))
);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
