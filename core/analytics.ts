import posthog, { Config } from 'posthog-js';

let enabled = false;

export function initPostHog(apiKey: string, options?: Partial<Config>) {
  posthog.init(apiKey, options as Config);
  enabled = true;
}

export function captureEvent(event: string, properties?: Record<string, any>) {
  if (enabled) {
    posthog.capture(event, properties);
  }
} 