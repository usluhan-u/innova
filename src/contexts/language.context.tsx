import React from 'react';
import { useRouter } from 'next/router';

interface LanguageProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export type Language = 'tr' | 'en';

export const LanguageContext = React.createContext({});

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const router = useRouter();
  const [language, setLanguage] = React.useState<Language>('tr');

  React.useEffect(() => {
    const currentLanguage = (localStorage.getItem('language') ||
      'tr') as Language;
    setLanguage(currentLanguage);
  }, []);

  const switchLanguage = React.useCallback(
    (newLanguage: Language) => {
      setLanguage((currentLanguage) =>
        currentLanguage !== newLanguage ? newLanguage : currentLanguage
      );

      localStorage.setItem('language', newLanguage);

      router.push(router.asPath, undefined, { locale: newLanguage });
    },
    [router]
  );

  const value = React.useMemo(
    () => ({ language, switchLanguage }),
    [language, switchLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
