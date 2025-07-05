import { EvaluationContext, Evaluator } from '../core/evaluator';

// Using fetch mock for other tests if needed
(global as any).fetch = jest.fn();

const ctx: EvaluationContext = {
  flags: { viewed_pricing: true },
  components: [
    { id: 'modal1', type: 'modal', sets_flag: 'modal_shown' },
    { id: 'banner1', type: 'banner' },
  ],
  goal: 'schedule_meeting',
  page: '/pricing',
};

const mockDecision = { render: ['modal1'], set_flags: ['modal_shown'] };

function setupOpenAIFetch(text: string) {
  (fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => ({ choices: [{ message: { content: text } }] })
  });
}

describe('Evaluator', () => {
  it('parses OpenAI response', async () => {
    const spy = jest.spyOn(Evaluator.prototype as any, 'callLLM').mockResolvedValueOnce(JSON.stringify(mockDecision));
    const ev = new Evaluator('openai', 'testkey');
    const result = await ev.evaluate(ctx);
    expect(result).toEqual(mockDecision);
    spy.mockRestore();
  });
}); 