import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './api/apiSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApiProvider api={apiSlice}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApiProvider>
    
);

reportWebVitals();
