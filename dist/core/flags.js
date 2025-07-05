import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
const IntentflowContext = createContext(undefined);
export function IntentflowProvider({ children }) {
    const [flags, setFlags] = useState({});
    const setFlag = useCallback((name, value = true) => {
        setFlags((f) => ({ ...f, [name]: value }));
    }, []);
    const hasFlag = useCallback((name) => !!flags[name], [flags]);
    const value = useMemo(() => ({ flags, setFlag, hasFlag }), [flags, setFlag, hasFlag]);
    return _jsx(IntentflowContext.Provider, { value: value, children: children });
}
export function useIntentflow() {
    const ctx = useContext(IntentflowContext);
    if (!ctx) {
        throw new Error('useIntentflow must be used within IntentflowProvider');
    }
    return ctx;
}
