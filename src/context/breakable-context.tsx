import { createContext, useContext, useEffect, useState } from "react";

interface InitialContext {
  containsPageBreak: boolean;
  setContainsPageBreak: ((containsPageBreak: boolean) => void) | undefined;
}

const initialContext: InitialContext = {
  containsPageBreak: false,
  setContainsPageBreak: undefined,
};

const PageBreakContext = createContext<InitialContext>(initialContext);

export const BreakableProvider = ({
  children,
  stopStatePropagation,
}: {
  children: React.ReactNode;
  stopStatePropagation?: boolean;
}) => {
  const [containsPageBreakLocal, setContainsPageBreakLocal] = useState(false);
  const {
    containsPageBreak: containsPageBreakUpper,
    setContainsPageBreak: setContainsPageBreakUpper,
  } = useBreakable();

  const setContainsPageBreak = (containsPageBreak: boolean) => {
    if (!stopStatePropagation && setContainsPageBreakUpper) {
      setContainsPageBreakUpper(containsPageBreak);
    } else {
      setContainsPageBreakLocal(containsPageBreak);
    }
  };

  useEffect(() => {
    setContainsPageBreakLocal(containsPageBreakUpper);
  }, [containsPageBreakUpper]);

  return (
    <PageBreakContext.Provider
      value={{
        containsPageBreak: containsPageBreakLocal,
        setContainsPageBreak,
      }}
    >
      {children}
    </PageBreakContext.Provider>
  );
};

export const useBreakable = () => {
  const context = useContext(PageBreakContext);
  if (!context) {
    return initialContext;
  }
  return context;
};
