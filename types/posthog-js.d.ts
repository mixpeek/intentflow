declare module 'posthog-js' {
  export interface Config {
    api_host?: string;
    autocapture?: boolean;
    [key: string]: any;
  }

  interface PostHog {
    init(apiKey: string, options?: Partial<Config>): void;
    capture(event: string, properties?: Record<string, any>): void;
    identify?(distinctId: string): void;
  }

  const posthog: PostHog;
  export default posthog;
} 