import fetch from 'cross-fetch';
import posthog, { Config } from 'posthog-js';

type CaptureFn = (event: string, properties?: Record<string, any>) => void;

const adapters: CaptureFn[] = [];

function registerAdapter(fn: CaptureFn) {
  adapters.push(fn);
}

export function captureEvent(event: string, properties?: Record<string, any>) {
  adapters.forEach((fn) => fn(event, properties));
}

// ---------------- PostHog -----------------

export function initPostHog(apiKey: string, options?: Partial<Config>) {
  posthog.init(apiKey, options as Config);
  registerAdapter((event, props) => posthog.capture(event, props));
}

// ---------------- Amplitude --------------
let amplitudeKey: string | undefined;
export function initAmplitude(apiKey: string) {
  amplitudeKey = apiKey;
  registerAdapter((event, props) => {
    if (!amplitudeKey) return;
    fetch('https://api.amplitude.com/2/httpapi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: amplitudeKey, events: [{ event_type: event, event_properties: props || {} }] }),
    }).catch(() => undefined);
  });
}

// ---------------- Heap -------------------
let heapAppId: string | undefined;
export function initHeap(appId: string) {
  heapAppId = appId;
  registerAdapter((event, props) => {
    if (!heapAppId) return;
    fetch('https://heapanalytics.com/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_id: heapAppId, event, properties: props || {} }),
    }).catch(() => undefined);
  });
}

// --------------- RudderStack -------------
let rudderCfg: { writeKey: string; dataPlane: string } | undefined;
export function initRudderStack(writeKey: string, dataPlaneUrl: string) {
  rudderCfg = { writeKey, dataPlane: dataPlaneUrl.replace(/\/$/, '') };
  registerAdapter((event, props) => {
    if (!rudderCfg) return;
    fetch(`${rudderCfg.dataPlane}/v1/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ writeKey: rudderCfg.writeKey, event, properties: props || {} }),
    }).catch(() => undefined);
  });
}

// --------------- Snowplow ----------------
let snowplowCollector: string | undefined;
export function initSnowplow(collector: string) {
  snowplowCollector = collector.replace(/\/$/, '');
  registerAdapter((event, props) => {
    if (!snowplowCollector) return;
    const url = `${snowplowCollector}/com.snowplowanalytics.snowplow/tp2`;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schema: 'iglu:com.acme/event/jsonschema/1-0-0', data: { event, ...props } }),
    }).catch(() => undefined);
  });
}

// --------------- Matomo ------------------
let matomoSiteId: string | undefined;
let matomoUrl: string | undefined;
export function initMatomo(siteId: string, endpoint: string) {
  matomoSiteId = siteId;
  matomoUrl = endpoint.replace(/\/$/, '');
  registerAdapter((event, props) => {
    if (!matomoSiteId || !matomoUrl) return;
    const url = `${matomoUrl}/matomo.php`;
    const body = new URLSearchParams({
      idsite: matomoSiteId,
      e_c: 'intentflow',
      e_a: event,
      e_n: event,
      e_v: '1',
      rec: '1',
      _id: '0000000000000000',
      rand: String(Math.random()),
    });
    // append props as json if present
    if (props) body.append('data', encodeURIComponent(JSON.stringify(props)));
    fetch(url, { method: 'POST', body }).catch(() => undefined);
  });
} 