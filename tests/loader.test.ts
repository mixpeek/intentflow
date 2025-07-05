import { parseFlowYAML } from '../core/loader';

describe('parseFlowYAML', () => {
  it('parses a simple flow definition', () => {
    const yamlSource = `
    goals:
      schedule_meeting:
        steps:
          - id: viewed_pricing
            event: page_view
    `;

    const result = parseFlowYAML(yamlSource);
    expect(result.goals).toBeDefined();
    const goal = result.goals['schedule_meeting'];
    expect(goal).toBeDefined();
    expect(goal.steps[0].id).toBe('viewed_pricing');
  });
}); 