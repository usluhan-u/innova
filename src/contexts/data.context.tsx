import React from 'react';

interface LocalizedSlugs {
  [key: string]: string | undefined;
}

interface Context {
  localizedSlugs: LocalizedSlugs;
  setLocalizedSlugs?: (slugs: LocalizedSlugs) => void;
}

const DataContext = React.createContext<Context | undefined>(undefined);

const useDataContext = (): Context => {
  const context = React.useContext(DataContext);

  if (!context) {
    throw new Error('Data context cannot be used outside the Data provider');
  }

  return context;
};

export const DataProvider = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[];
}): JSX.Element => {
  const [currentLocalizedSlugs, setCurrentLocalizedSlugs] =
    React.useState<LocalizedSlugs>({});

  const initialValue = React.useMemo(
    () => ({
      localizedSlugs: currentLocalizedSlugs,
      setLocalizedSlugs: setCurrentLocalizedSlugs
    }),
    [currentLocalizedSlugs]
  );

  return (
    <DataContext.Provider value={initialValue}>{children}</DataContext.Provider>
  );
};

export const useData = (): Context => useDataContext();
