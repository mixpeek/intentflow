import fetch from 'cross-fetch';
import { captureEvent, initAmplitude, initHeap, initMatomo, initRudderStack, initSnowplow } from '../core/analytics';

beforeEach(() => {
  (fetch as jest.Mock).mockClear();
});

describe('Analytics provider integrations', () => {
  it('Amplitude sends to correct endpoint', () => {
    initAmplitude('amp-key');
    captureEvent('test_event', { plan: 'pro' });
    expect(fetch).toHaveBeenCalledWith('https://api.amplitude.com/2/httpapi', expect.any(Object));
  });

  it('Heap sends to correct endpoint', () => {
    initHeap('heap-app');
    captureEvent('test_event');
    expect(fetch).toHaveBeenCalledWith('https://heapanalytics.com/api/track', expect.any(Object));
  });

  it('RudderStack sends to dataplane', () => {
    initRudderStack('writeKey', 'https://rs.example.com');
    captureEvent('event');
    expect(fetch).toHaveBeenCalledWith('https://rs.example.com/v1/track', expect.any(Object));
  });

  it('Snowplow sends to collector', () => {
    initSnowplow('https://collector.example.com');
    captureEvent('event');
    expect(fetch).toHaveBeenCalledWith('https://collector.example.com/com.snowplowanalytics.snowplow/tp2', expect.any(Object));
  });

  it('Matomo sends to endpoint', () => {
    initMatomo('1', 'https://matomo.example.com');
    captureEvent('event');
    expect(fetch).toHaveBeenCalledWith('https://matomo.example.com/matomo.php', expect.any(Object));
  });
}); 