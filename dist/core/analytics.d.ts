import { Config } from 'posthog-js';
export declare function captureEvent(event: string, properties?: Record<string, any>): void;
export declare function initPostHog(apiKey: string, options?: Partial<Config>): void;
export declare function initAmplitude(apiKey: string): void;
export declare function initHeap(appId: string): void;
export declare function initRudderStack(writeKey: string, dataPlaneUrl: string): void;
export declare function initSnowplow(collector: string): void;
export declare function initMatomo(siteId: string, endpoint: string): void;
