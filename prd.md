# 🧠 Project PRD: `intentflow`

## 📌 Purpose

Build an open-source UX flow framework that:

* Lets developers **define user interaction flows in YAML**
* **Tracks flags** representing user milestones or events
* Dynamically **renders components** (modals, tooltips, banners, etc.) based on those flags
* Optionally integrates an **LLM** to decide which UX elements to show, based on context
* Provides optional hooks for **Mixpeek** to:

  * Retrieve optimal flows or components based on semantic session queries
  * Log session traces for future optimization
  * Enable cookieless, context-based personalization

---

## 🔧 Functional Requirements

### 1. **YAML Flow Definition**

* Support a declarative YAML format:

```yaml
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

* Each step can define:

  * `id`
  * `event` (`click`, `hover`, `submit`, `page_view`, etc.)
  * `selector` (CSS)
  * `requires_flags` (preconditions)
  * `set_flag` (new state)

---

### 2. **React SDK**

* Provide a `intentflowProvider` (React context) to:

  * Store flags
  * Set and check flags
* Provide hooks:

  * `useUXStep(goal, stepId)` to attach behavior to events
  * `useUXFlag(flagName)` to check/set flags
  * `useUXGoal(goalName)` to check flow completion

---

### 3. **Component Layer**

* Provide built-in components:

  * `Tooltip`
  * `Modal`
  * `Banner`
* Each component can:

  * Be declaratively described in YAML
  * Be conditionally rendered based on flags or LLM output

---

### 4. **LLM Decision Interface (Optional)**

* Define a JSON schema the LLM can consume:

```json
{
  "flags": { "viewed_pricing": true, "interested_user": false },
  "components": [
    { "id": "modal1", "type": "modal", "sets_flag": "modal_shown" },
    ...
  ],
  "goal": "schedule_meeting",
  "page": "/pricing"
}
```

* LLM returns:

```json
{
  "render": ["modal1"],
  "set_flags": ["modal_shown"]
}
```

---

### 5. **Mixpeek Integration (Optional)**

* Store session logs to Mixpeek for clustering/optimization:

```json
{
  "text": "User visited pricing, clicked CTA, saw modal",
  "flags": ["viewed_pricing", "interested_user"],
  "goal": "schedule_meeting",
  "outcome": "booked"
}
```

* Allow retrieval of flows:

```ts
await mixpeek.retrieve("intentflow", "User hovered pricing, didn’t convert")
```

* Allow re-ranking of component effectiveness based on similar sessions

---

## 🗂 File Structure

```
intentflow/
├── core/
│   ├── loader.ts         # YAML → normalized JS object
│   ├── flags.ts          # Global flag store (context)
│   ├── hooks.ts          # React hooks for tracking + checking flags
│   ├── components.tsx    # Modal, tooltip, etc.
│   └── evaluator.ts      # Optional LLM-based decision engine
├── mixpeek-adapter/      # Logging, retrieval, re-ranking logic
├── public-flows/         # Example YAML flow configs
├── examples/             # React demo app
├── docs/
├── README.md
└── package.json
```

---

## ✅ Non-Functional Requirements

* Written in **TypeScript**
* Designed to be **framework-agnostic** (React-first, Vue/Svelte adapters later)
* **SSR-compatible** for Next.js / Remix
* **Tree-shakable** and modular
* Easily integratable into analytics stacks like **PostHog**, **Segment**

---

## 🧪 Example Use Cases

| Goal               | Sample Trigger Path   | UX Element |
| ------------------ | --------------------- | ---------- |
| `schedule_meeting` | `/pricing`            | Modal      |
| `capture_email`    | Footer interaction    | Banner     |
| `qualify_interest` | `/use-cases`, `/docs` | Tooltip    |

---

## 🧰 Future Add-ons

* Flag expiration (e.g. auto-clear after session)
* Flow chaining (`if goal A succeeds, start goal B`)
* User segmentation
* Server-side flag injection (from backend/session state)

---

Let me know if you want a GitHub Actions-ready starter or `create-intentflow-app` style CLI scaffold.
