import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import posthog from 'posthog-js';
import { initPostHog } from '../core/analytics';
import { IntentflowProvider } from '../core/flags';
import { useUXFlag } from '../core/hooks';

function FlagTestComponent() {
  const [flag, setFlag] = useUXFlag('viewed_pricing');
  return (
    <div>
      <span data-testid="flag-value">{String(flag)}</span>
      <button onClick={() => setFlag()}>Set Flag</button>
    </div>
  );
}

describe('IntentflowProvider + useUXFlag', () => {
  it('updates flag state via hook', async () => {
    initPostHog('testkey');
    render(
      <IntentflowProvider>
        <FlagTestComponent />
      </IntentflowProvider>
    );

    expect(screen.getByTestId('flag-value')).toHaveTextContent('false');
    await userEvent.click(screen.getByText('Set Flag'));
    expect(screen.getByTestId('flag-value')).toHaveTextContent('true');
    expect(posthog.capture).toHaveBeenCalledWith('intentflow_flag_set', { flag: 'viewed_pricing', value: true });
  });
}); 