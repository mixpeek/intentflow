import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import posthog from 'posthog-js';
import { initPostHog } from '../core/analytics';
import { IntentflowProvider } from '../core/flags';
import { useUXFlag } from '../core/hooks';
function FlagTestComponent() {
    const [flag, setFlag] = useUXFlag('viewed_pricing');
    return (_jsxs("div", { children: [_jsx("span", { "data-testid": "flag-value", children: String(flag) }), _jsx("button", { onClick: () => setFlag(), children: "Set Flag" })] }));
}
describe('IntentflowProvider + useUXFlag', () => {
    it('updates flag state via hook', async () => {
        initPostHog('testkey');
        render(_jsx(IntentflowProvider, { children: _jsx(FlagTestComponent, {}) }));
        expect(screen.getByTestId('flag-value')).toHaveTextContent('false');
        await userEvent.click(screen.getByText('Set Flag'));
        expect(screen.getByTestId('flag-value')).toHaveTextContent('true');
        expect(posthog.capture).toHaveBeenCalledWith('intentflow_flag_set', { flag: 'viewed_pricing', value: true });
    });
});
