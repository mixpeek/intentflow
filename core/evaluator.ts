import fetch from 'cross-fetch';

export type LLMName = 'openai' | 'gemini' | 'claude';

export interface EvaluationContext {
  flags: Record<string, boolean>;
  components: { id: string; type: string; sets_flag?: string }[];
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

export class Evaluator {
  private readonly provider: LLMName;
  private readonly apiKey: string;
  private readonly opts: EvaluatorOptions;

  constructor(provider: LLMName, apiKey: string, opts: EvaluatorOptions = {}) {
    this.provider = provider;
    this.apiKey = apiKey;
    this.opts = opts;
  }

  async evaluate(ctx: EvaluationContext): Promise<LLMDecision> {
    const prompt = this.buildPrompt(ctx);
    const responseText = await this.callLLM(prompt);

    try {
      const parsed: LLMDecision = JSON.parse(responseText);
      return parsed;
    } catch (err) {
      throw new Error(`Failed to parse LLM response: ${err}`);
    }
  }

  private buildPrompt(ctx: EvaluationContext): string {
    return `Given the following JSON context, decide which components to render and which flags to set.\nContext: ${JSON.stringify(
      ctx
    )}\nReturn a JSON object with keys \\\"render\\\" and \\\"set_flags\\\".`;
  }

  private async callLLM(prompt: string): Promise<string> {
    switch (this.provider) {
      case 'openai':
        return this.callOpenAI(prompt);
      case 'gemini':
        return this.callGemini(prompt);
      case 'claude':
        return this.callClaude(prompt);
      default:
        throw new Error('Unsupported provider');
    }
  }

  private async callOpenAI(prompt: string): Promise<string> {
    const body = {
      model: this.opts.model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    };
    const res = await fetch(this.opts.apiBase || 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(body),
    });
    const json: any = await res.json();
    return json.choices?.[0]?.message?.content?.trim() || '';
  }

  private async callGemini(prompt: string): Promise<string> {
    const url =
      (this.opts.apiBase || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent') +
      `?key=${this.apiKey}`;
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const json: any = await res.json();
    return json.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
  }

  private async callClaude(prompt: string): Promise<string> {
    const body = {
      model: this.opts.model || 'claude-3-sonnet-20240229',
      system: 'You are an assistant deciding UX components.',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 256,
    };
    const res = await fetch(this.opts.apiBase || 'https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        Accept: 'application/json',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    });
    const json: any = await res.json();
    // Claude returns messages[].content[].text
    return json?.content?.[0]?.text?.trim() || '';
  }
} 