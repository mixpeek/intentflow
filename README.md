# Intentflow

![Intentflow Hero](docs/hero.png)

Intentflow is an open-source **UX flow framework** that lets product teams ship contextual onboarding, nudges, and promotions in minutes—not days.

## ✨ Why Intentflow?

* **Declarative** – author complex interaction flows in simple YAML.
* **Stateful** – flags track user milestones across pages and sessions.
* **Pluggable** – integrate analytics (PostHog), LLMs (ChatGPT, Claude, Gemini) or your own logic to decide which component to show.
* **Framework-agnostic** – React-first, with Vue/Svelte adapters on the roadmap.

Use it to:

| Outcome                               | Example Context                           | Component  |
|---------------------------------------|-------------------------------------------|------------|
| Increase trial → paid conversions      | User viewed pricing but didn't upgrade    | Modal      |
| Collect qualified leads               | User hit a feature paywall                | Banner     |
| Guide power users to hidden gems      | User hovers a rarely-used feature toggle  | Tooltip    |
| Drive webinar sign-ups                | Docs readers spending >3 min on tutorials | Modal      |

---

## 🏃‍♂️ Quick Start

```bash
# 1. Install peer deps
npm install react
# 2. Install Intentflow (local workspace)
npm install ./
```

```tsx
import {
  IntentflowProvider,
  useUXFlag,
  useUXStep,
  useUXGoal,
  Modal,
} from 'intentflow';

function App() {
  return (
    <IntentflowProvider>
      <YourRoutes />
    </IntentflowProvider>
  );
}
```

### Example YAML Flow

```yaml
# public-flows/example.yaml

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
```

Load and evaluate this flow:

```ts
import { loadFlowFile } from 'intentflow';

const flow = loadFlowFile('public-flows/example.yaml');
```

---

## 📈 Analytics Integration (PostHog)

```ts
import { initPostHog } from 'intentflow/core/analytics';

initPostHog(process.env.PUBLIC_POSTHOG_KEY!, {
  api_host: 'https://app.posthog.com',
  autocapture: false,
});
```

Every time a flag is set, Intentflow automatically fires `intentflow_flag_set` to PostHog. You can subscribe to additional events via your own code or use PostHog dashboards to correlate UX experiments with conversions.

---

## 🤖 LLM-Driven Decisioning

Intentflow ships with a lightweight `Evaluator` that can call **ChatGPT (OpenAI)**, **Gemini (Google)**, or **Claude (Anthropic)** to decide which components to render.

```ts
import { Evaluator } from 'intentflow';

const evaluator = new Evaluator('openai', process.env.OPENAI_API_KEY!);

const decision = await evaluator.evaluate({
  flags: { viewed_pricing: true },
  components: [{ id: 'modal1', type: 'modal' }],
  goal: 'schedule_meeting',
  page: '/pricing',
});

// decision.render -> ['modal1']
// decision.set_flags -> ['modal_shown']
```

Swap providers with a single arg:

```ts
new Evaluator('gemini', GCP_API_KEY);
new Evaluator('claude', ANTHROPIC_KEY);
```

---

## 🔌 Integrating with Mixpeek

Intentflow pairs seamlessly with [Mixpeek](https://mixpeek.com) to bring intelligent UX flow optimization powered by **multimodal retrieval, classification, and clustering**.

### ✅ What Mixpeek Adds

* **Semantic Flow Matching**
  → Retrieve the most relevant YAML-defined flow based on user session summaries, not just static rules.
  *"User hovered CTA, watched demo, abandoned signup"* → → `flow: schedule_meeting`.

* **Component Effectiveness Clustering**
  → Mixpeek clusters historical sessions (flags, outcomes, component usage) to surface which combinations of tooltips, banners, or modals worked best for each intent.

* **Multimodal Context Classification**
  → Classify sessions not just from flags or clicks, but video/audio inputs, transcript data, screenshots, etc.
  *E.g., "User watched a feature walkthrough video but skipped the pricing page."*

* **Searchable UX Memory**
  → Store all sessions as structured documents and search them:

  ```ts
  await mixpeek.search("Sessions where modals failed but tooltips worked");
  ```

* **Cookieless Personalization**
  → Use vector embeddings and session semantics to adapt the UI—no ID tracking required.

### 🧠 Example

```ts
import { retrieveFlow, rerankComponents, logSession } from 'intentflow/mixpeek';

const flow = await retrieveFlow("User clicked pricing, hovered CTA, did not convert");

const ranked = await rerankComponents({
  flags: { viewed_pricing: true, clicked_cta: false },
  goal: "schedule_meeting",
});

await logSession({
  flags: ["viewed_pricing", "tooltip_shown"],
  outcome: "no_conversion",
  goal: "schedule_meeting"
});
```

Mixpeek transforms your UX flows into a **searchable, improvable, intent-driven system**—powered by real multimodal session intelligence.

---

## 🗺 Roadmap / Contributing

* **Live session inspector / devtools overlay** – debug flows and flags in-browser
* **LLM prompt builder playground** – test & refine evaluator logic in-browser
* **Vue/Svelte adapters** – expand beyond React
* **Analytics adapters (RudderStack, Amplitude)** – drop-in integrations
* **Mixpeek-powered flow search & clustering UI** – see which flows are performing best
* **Component variant testing** – show alternate tooltips/modals for same step

PRs & issues welcome! 🎉