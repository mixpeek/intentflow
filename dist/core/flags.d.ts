import { ReactNode } from 'react';
type FlagStore = Record<string, boolean>;
interface IntentflowContextValue {
    flags: FlagStore;
    setFlag: (name: string, value?: boolean) => void;
    hasFlag: (name: string) => boolean;
}
export declare function IntentflowProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useIntentflow(): IntentflowContextValue;
export {};
