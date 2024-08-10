import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Style/index.css'
import './Style/elementAnimation.css'
import './Js/ElementAnimationOnScroll.js'

import { BrowserRouter } from 'react-router-dom';
import global_en from "./Translation/en/global.json";
import global_he from "./Translation/he/global.json";
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation:{escapeValue: true},
  lng:"he",
  resources:{
    he: {
      global:global_he
    },
    en: {
      global:global_en
    }
  }
})

// Function to update the root element's class
const updateRootClass = () => {
  const rootElement = document.getElementById('root');
  if (i18next.language === 'he') {
    rootElement.classList.add('rtl');
    rootElement.classList.remove('ltr');
  } else {
    rootElement.classList.add('ltr');
    rootElement.classList.remove('rtl');
  }
};

// Initial call to set the class based on the default language
updateRootClass();

// Listen to language change events to update the class dynamically
i18next.on('languageChanged', () => {
  updateRootClass();
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter/>
    <App />
    </I18nextProvider> 
  </React.StrictMode>,
)
