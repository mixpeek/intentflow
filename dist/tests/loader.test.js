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
    it('parses a full example YAML structure', () => {
        const yamlSource = `
    goals:
      schedule_meeting:
        steps:
          - id: viewed_pricing
            event: page_view
            path: "/pricing"
            set_flag: viewed_pricing
          - id: clicked_cta
            event: click
            selector: ".cta-button"
            requires_flags: [viewed_pricing]
            set_flag: interested_user
    `;
        const result = parseFlowYAML(yamlSource);
        const goal = result.goals['schedule_meeting'];
        expect(goal.steps.length).toBe(2);
        expect(goal.steps[0].path).toBe('/pricing');
        expect(goal.steps[1].requires_flags).toContain('viewed_pricing');
    });
});
