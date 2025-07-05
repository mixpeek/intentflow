# Why We Built Intentflow: The Lightweight UX Flow Engine for Growth Teams

At Mixpeek, we track a lot: homepage interactions, docs exploration, demo CTAs, SDK installs. Like most growth-minded teams we're rich in hypotheses—and poor in implementation bandwidth.

We needed a way to ship contextual UX flows **fast** without hard-coding logic into every page or paying for heavyweight onboarding suites.

So we built **[Intentflow](https://github.com/mixpeek/intentflow)**—an open-source engine that lets anyone define banners, tooltips, and modals in YAML and render them dynamically with React.

---

## 🚀 Quick Install

```bash
npm install intentflow
```

```tsx
import { IntentflowProvider } from 'intentflow';

<IntentflowProvider>
  <App />
</IntentflowProvider>
```

---

## 🌟 What *Is* Intentflow?

Think of Intentflow as **feature flags for UX flows**. You describe a journey declaratively and Intentflow handles flag tracking and component rendering.

```yaml
# schedule_meeting.yaml

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

Wrap components with hooks like `useUXFlag`, `useUXStep`, or drop in `<Modal>` / `<Tooltip>` and let the flow engine do the rest.

---

## 😤 Why Existing Tools Fell Short

| Tool            | Why It Didn't Work                        |
| --------------- | ----------------------------------------- |
| Appcues / Pendo | Too heavy, rigid, and pricey              |
| PostHog / Segment | Great tracking, **no** UI control       |
| Custom JS       | Hard to maintain across 20+ pages         |

We wanted:

* Version-controlled YAML
* Full control over rendering
* Built-in flag tracking
* No vendor lock-in / minimal JS

Intentflow gave us that—and nothing else did.

---

## 🔥 How We Use Intentflow at Mixpeek

* **Homepage Engagement** – set flags like `viewed_pricing`, `hovered_demo`
* **Contextual Onboarding** – trigger tooltips on docs & dashboards
* **Demo & Lead Capture** – show modals when a user signals intent but hasn't converted
* **Dynamic Banners** – guide sign-ups based on scroll-depth & exits

All defined in YAML, reviewed in PRs, and shipped in minutes.

---

## 📈 Analytics Integrations

Intentflow broadcasts every `captureEvent` to any provider you initialise.

| Provider | Focus | OSS? | Init Example |
|----------|-------|------|--------------|
| [PostHog](https://posthog.com) | Product analytics + feature flags | Yes | `initPostHog('PH_KEY')` |
| [Amplitude](https://amplitude.com) | Growth analytics & cohorts | No | `initAmplitude('AMP_KEY')` |
| [Heap](https://heap.io) | Auto-captured events | No | `initHeap('HEAP_APP_ID')` |
| [RudderStack](https://rudderstack.com) | CDP / data pipeline | Partial | `initRudderStack('WRITE_KEY','https://rs.acme.com')` |
| [Snowplow](https://snowplow.io) | Behavioural data platform | Yes | `initSnowplow('https://collector.acme.com')` |
| [Matomo](https://matomo.org) | GDPR-focused analytics | Yes | `initMatomo('SITE_ID','https://matomo.acme.com')` |

---

## 🤖 LLM-Driven Decisioning

Need smarter targeting? `Evaluator` lets you ask your favourite model which component to render.

| Provider | Model Family | Init Example |
|----------|--------------|--------------|
| [OpenAI ChatGPT](https://platform.openai.com) | GPT-3.5 / GPT-4 | `new Evaluator('openai', OPENAI_KEY)` |
| [Google Gemini](https://ai.google.dev) | Gemini-Pro | `new Evaluator('gemini', GEMINI_KEY)` |
| [Anthropic Claude](https://www.anthropic.com) | Claude 3 | `new Evaluator('claude', ANTHROPIC_KEY)` |

```ts
const decision = await evaluator.evaluate({
  flags: { viewed_pricing: true },
  components: [{ id: 'modal1', type: 'modal' }],
  goal: 'schedule_meeting',
  page: '/pricing'
});
```

---

## 🔌 Supercharge with Mixpeek

Pair Intentflow with Mixpeek's retrieval engine to:

1. **Retrieve** the best YAML flow for a session
2. **Cluster** historical sessions to surface winning patterns
3. **Personalise** without cookies using multimodal vectors

```ts
import { retrieveFlow } from 'intentflow/mixpeek';
const flow = await retrieveFlow("User hovered CTA, watched demo");
```

---

## 🗺 Roadmap

* Devtools overlay to inspect flags live
* LLM prompt builder playground
* Component A/B testing with clustering insights
* Vue, Svelte & Solid bindings

---

## 👐 Open Source & Contributing

Intentflow is **free & open-source** under the permissive [Apache-2.0 license](https://www.apache.org/licenses/LICENSE-2.0).

We **welcome pull requests** for:

* New analytics adapters
* Additional framework bindings
* Docs & examples
* Bug fixes / performance tweaks

→ Fork the repo, open a PR, and build the composable UX engine growth teams deserve.

---

## Ready to Try?

```bash
npm install intentflow
```

Ship contextual UX in minutes—not days. Built for devs. Designed for growth. Powered by Mixpeek.
