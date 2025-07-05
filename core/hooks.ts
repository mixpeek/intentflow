import { useEffect } from 'react';
import { useIntentflow } from './flags';

export function useUXFlag(flag: string): [boolean, (value?: boolean) => void] {
  const { hasFlag, setFlag } = useIntentflow();
  return [hasFlag(flag), (value: boolean = true) => setFlag(flag, value)];
}

export function useUXGoal(goalName: string): boolean {
  const { hasFlag } = useIntentflow();
  return hasFlag(`goal:${goalName}:completed`);
}

export interface UseUXStepOptions {
  trigger?: () => boolean; // Optional manual trigger predicate
}

export function useUXStep(goal: string, stepId: string, opts: UseUXStepOptions = {}) {
  const { setFlag } = useIntentflow();

  useEffect(() => {
    if (opts.trigger && opts.trigger()) {
      setFlag(`step:${goal}:${stepId}:completed`);
    }
    // TODO: attach event listeners based on flow definition
  }, [goal, stepId, opts, setFlag]);
} 