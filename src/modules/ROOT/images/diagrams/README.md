# Diagrams

These `*.drawio.svg` files are created and edited in [draw.io](https://www.drawio.com/) and exported as SVG with the diagram source embedded (the `content` attribute on the root `<svg>`), so they can be reopened and edited directly in draw.io later.

Styling conventions used across these diagrams:

- Font: Helvetica, 14px, bold, for all labels.

- Colors use `light-dark()` CSS values (e.g. `light-dark(#000000, #ffffff)`) so shapes and text adapt to light/dark mode automatically.

- Shape strokes: 2px, black (adapting via `light-dark()`).

- Shape fills: white in light mode, dark in dark mode, via the same `light-dark()` pattern.
