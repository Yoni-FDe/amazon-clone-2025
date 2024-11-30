import { StrictMode } from 'react'
import {createRoot} from 'react-dom/client';
import React from 'react';
import './index.css'
import App from './App.jsx'
import  {DataProvider}  from './Components/DataProvider/DataProvider.jsx'
import { initialState,reducer } from './Utility/reducer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
          <App />
    </DataProvider>
  </StrictMode>
)
