export declare function useUXFlag(flag: string): [boolean, (value?: boolean) => void];
export declare function useUXGoal(goalName: string): boolean;
export interface UseUXStepOptions {
    trigger?: () => boolean;
}
export declare function useUXStep(goal: string, stepId: string, opts?: UseUXStepOptions): void;
