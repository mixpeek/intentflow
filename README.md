# Intentflow

Intentflow is an open-source UX flow framework that lets you:

* Define user interaction flows declaratively in **YAML**
* Track **flags** representing milestones or events
* Dynamically render **React components** (modals, tooltips, banners) based on those flags

```bash
# Install peer deps
npm install react
# Install Intentflow (local workspace)
npm install ./
```

```tsx
import { IntentflowProvider, useUXFlag } from 'intentflow';

function App() {
  return (
    <IntentflowProvider>
      <YourRoutes />
    </IntentflowProvider>
  );
}
```

For a full project description, see `prd.md`. 