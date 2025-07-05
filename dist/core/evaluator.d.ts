export type LLMName = 'openai' | 'gemini' | 'claude';
export interface EvaluationContext {
    flags: Record<string, boolean>;
    components: {
        id: string;
        type: string;
        sets_flag?: string;
    }[];
    goal: string;
    page: string;
}
export interface LLMDecision {
    render: string[];
    set_flags: string[];
}
interface EvaluatorOptions {
    model?: string;
    apiBase?: string;
}
export declare class Evaluator {
    private readonly provider;
    private readonly apiKey;
    private readonly opts;
    constructor(provider: LLMName, apiKey: string, opts?: EvaluatorOptions);
    evaluate(ctx: EvaluationContext): Promise<LLMDecision>;
    private buildPrompt;
    private callLLM;
    private callOpenAI;
    private callGemini;
    private callClaude;
}
export {};
