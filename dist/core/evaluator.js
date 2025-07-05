import fetch from 'cross-fetch';
export class Evaluator {
    constructor(provider, apiKey, opts = {}) {
        this.provider = provider;
        this.apiKey = apiKey;
        this.opts = opts;
    }
    async evaluate(ctx) {
        const prompt = this.buildPrompt(ctx);
        const responseText = await this.callLLM(prompt);
        try {
            const parsed = JSON.parse(responseText);
            return parsed;
        }
        catch (err) {
            throw new Error(`Failed to parse LLM response: ${err}`);
        }
    }
    buildPrompt(ctx) {
        return `Given the following JSON context, decide which components to render and which flags to set.\nContext: ${JSON.stringify(ctx)}\nReturn a JSON object with keys \\\"render\\\" and \\\"set_flags\\\".`;
    }
    async callLLM(prompt) {
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
    async callOpenAI(prompt) {
        var _a, _b, _c, _d;
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
        const json = await res.json();
        return ((_d = (_c = (_b = (_a = json.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.trim()) || '';
    }
    async callGemini(prompt) {
        var _a, _b, _c, _d, _e, _f;
        const url = (this.opts.apiBase || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent') +
            `?key=${this.apiKey}`;
        const body = {
            contents: [{ parts: [{ text: prompt }] }],
        };
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        const json = await res.json();
        return ((_f = (_e = (_d = (_c = (_b = (_a = json.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text) === null || _f === void 0 ? void 0 : _f.trim()) || '';
    }
    async callClaude(prompt) {
        var _a, _b, _c;
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
        const json = await res.json();
        // Claude returns messages[].content[].text
        return ((_c = (_b = (_a = json === null || json === void 0 ? void 0 : json.content) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c.trim()) || '';
    }
}
