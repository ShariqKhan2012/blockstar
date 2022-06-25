import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Web3ContextProvider } from './store/web3-context';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <Web3ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Web3ContextProvider>
  //</React.StrictMode>
)
