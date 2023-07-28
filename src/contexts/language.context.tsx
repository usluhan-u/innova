import React from 'react';
import { useRouter } from 'next/router';

export type Language = 'tr' | 'en';

interface Context {
  language: Language;
  switchLanguage?: (language: Language) => void;
}

export const LanguageContext = React.createContext<Context | undefined>(
  undefined
);

const useLanguageContext = (): Context => {
  const context = React.useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'Language context cannot be used outside the Language provider'
    );
  }

  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const LanguageProvider = ({
  children
}: LanguageProviderProps): JSX.Element => {
  const router = useRouter();

  const [currentLanguage, setCurrentLanguage] = React.useState<Language>('tr');

  React.useEffect(() => {
    const current =
      (localStorage.getItem('language') as Language) || router.locale;

    setCurrentLanguage(current);
    localStorage.setItem('language', current);
  }, [router.locale]);

  const switchLanguage = React.useCallback((newLanguage: Language) => {
    setCurrentLanguage(newLanguage);

    localStorage.setItem('language', newLanguage);
  }, []);

  const initialValue = React.useMemo(
    () => ({
      language: currentLanguage,
      switchLanguage
    }),
    [currentLanguage, switchLanguage]
  );

  return (
    <LanguageContext.Provider value={initialValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): Context => useLanguageContext();
