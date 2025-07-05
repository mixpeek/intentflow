import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { captureEvent } from './analytics';

type FlagStore = Record<string, boolean>;

interface IntentflowContextValue {
  flags: FlagStore;
  setFlag: (name: string, value?: boolean) => void;
  hasFlag: (name: string) => boolean;
}

const IntentflowContext = createContext<IntentflowContextValue | undefined>(undefined);

export function IntentflowProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FlagStore>({});

  const setFlag = useCallback((name: string, value: boolean = true) => {
    setFlags((f) => ({ ...f, [name]: value }));
    captureEvent('intentflow_flag_set', { flag: name, value });
  }, []);

  const hasFlag = useCallback((name: string) => !!flags[name], [flags]);

  const value = useMemo(() => ({ flags, setFlag, hasFlag }), [flags, setFlag, hasFlag]);

  return <IntentflowContext.Provider value={value}>{children}</IntentflowContext.Provider>;
}

export function useIntentflow() {
  const ctx = useContext(IntentflowContext);
  if (!ctx) {
    throw new Error('useIntentflow must be used within IntentflowProvider');
  }
  return ctx;
} 