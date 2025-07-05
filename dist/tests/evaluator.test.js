import { Evaluator } from '../core/evaluator';
// Using fetch mock for other tests if needed
global.fetch = jest.fn();
const ctx = {
    flags: { viewed_pricing: true },
    components: [
        { id: 'modal1', type: 'modal', sets_flag: 'modal_shown' },
        { id: 'banner1', type: 'banner' },
    ],
    goal: 'schedule_meeting',
    page: '/pricing',
};
const mockDecision = { render: ['modal1'], set_flags: ['modal_shown'] };
function setupOpenAIFetch(text) {
    fetch.mockResolvedValueOnce({
        json: async () => ({ choices: [{ message: { content: text } }] })
    });
}
describe('Evaluator', () => {
    it('parses OpenAI response', async () => {
        const spy = jest.spyOn(Evaluator.prototype, 'callLLM').mockResolvedValueOnce(JSON.stringify(mockDecision));
        const ev = new Evaluator('openai', 'testkey');
        const result = await ev.evaluate(ctx);
        expect(result).toEqual(mockDecision);
        spy.mockRestore();
    });
    it('parses Gemini response', async () => {
        const spy = jest.spyOn(Evaluator.prototype, 'callLLM').mockResolvedValueOnce(JSON.stringify(mockDecision));
        const ev = new Evaluator('gemini', 'fake-key');
        const result = await ev.evaluate(ctx);
        expect(result.render).toContain('modal1');
        spy.mockRestore();
    });
    it('parses Claude response', async () => {
        const spy = jest.spyOn(Evaluator.prototype, 'callLLM').mockResolvedValueOnce(JSON.stringify(mockDecision));
        const ev = new Evaluator('claude', 'fake-key');
        const result = await ev.evaluate(ctx);
        expect(result.set_flags).toContain('modal_shown');
        spy.mockRestore();
    });
});
