import { useEffect } from 'react';
import { useIntentflow } from './flags';
export function useUXFlag(flag) {
    const { hasFlag, setFlag } = useIntentflow();
    return [hasFlag(flag), (value = true) => setFlag(flag, value)];
}
export function useUXGoal(goalName) {
    const { hasFlag } = useIntentflow();
    return hasFlag(`goal:${goalName}:completed`);
}
export function useUXStep(goal, stepId, opts = {}) {
    const { setFlag } = useIntentflow();
    useEffect(() => {
        if (opts.trigger && opts.trigger()) {
            setFlag(`step:${goal}:${stepId}:completed`);
        }
        // TODO: attach event listeners based on flow definition
    }, [goal, stepId, opts, setFlag]);
}
