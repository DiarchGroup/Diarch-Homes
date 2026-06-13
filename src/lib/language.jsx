import React, { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext({ lang: 'en', toggle: () => {} });

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const toggle = useCallback(() => setLang((p) => (p === 'en' ? 'hi' : 'en')), []);
  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
