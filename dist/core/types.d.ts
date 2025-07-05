export type UXEvent = 'click' | 'hover' | 'submit' | 'page_view';
export interface UXStep {
    id: string;
    event: UXEvent;
    selector?: string;
    path?: string;
    requires_flags?: string[];
    set_flag?: string;
}
export interface UXGoal {
    steps: UXStep[];
}
export interface UXFlowDefinition {
    goals: Record<string, UXGoal>;
}
