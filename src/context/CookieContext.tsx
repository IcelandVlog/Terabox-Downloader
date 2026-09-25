import React, { createContext, useContext, useState, useEffect } from 'react';

interface CookieContextType {
  cookie: string;
  setCookie: (cookie: string) => void;
  hasCookie: () => boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookie, setCookieState] = useState<string>(() => {
    const saved = localStorage.getItem('terabox_cookie');
    return saved || 'ndus=Y2YqaCTteHuiU3Ud_MYU7vHoVW4DNBi0MPmg_1tQ'; // Default cookie with ndus prefix
  });

  const setCookie = (newCookie: string) => {
    // Ensure cookie has ndus prefix
    const formattedCookie = newCookie.startsWith('ndus=') ? newCookie : `ndus=${newCookie}`;
    setCookieState(formattedCookie);
    localStorage.setItem('terabox_cookie', formattedCookie);
  };

  const hasCookie = () => {
    return cookie.trim().length > 0;
  };

  return (
    <CookieContext.Provider value={{ cookie, setCookie, hasCookie }}>
      {children}
    </CookieContext.Provider>
  );
};

export const useCookie = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
};
