import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { captureEvent } from './analytics';
const IntentflowContext = createContext(undefined);
export function IntentflowProvider({ children }) {
    const [flags, setFlags] = useState({});
    const setFlag = useCallback((name, value = true) => {
        setFlags((f) => ({ ...f, [name]: value }));
        captureEvent('intentflow_flag_set', { flag: name, value });
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
