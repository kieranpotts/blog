# Diagrams

These `*.drawio.svg` files are created and edited in [draw.io](https://www.drawio.com/) and exported as SVG with the diagram source embedded (the `content` attribute on the root `<svg>`), so they can be reopened and edited directly in draw.io later.

Styling conventions used across these diagrams:

- Font: Helvetica, 14px, bold, for all labels.

- Colors use `light-dark()` CSS values (e.g. `light-dark(#000000, #ffffff)`) so shapes and text adapt to light/dark mode automatically.

- Shape strokes: 2px, black (adapting via `light-dark()`).

- Shape fills: white in light mode, dark in dark mode, via the same `light-dark()` pattern.

The SVGs are inlined/embedded into the document at build time (`opts=inline`). The reason for this is to guarantee the highest level of cross-browser compatibility for light/dark mode switches in the images. `light-dark()` only takes effect when the SVG's CSS is evaluated in the context of the embedding page. If an SVG is referenced as a normal raster-style image (ie. rendered to an `<img src="...">` tag), it gets its own independent, opaque rendering context that does not inherit the page's `color-scheme` — so `light-dark()` silently resolves to its light-mode value regardless of the user's dark mode preference. This is a browser/spec limitation, not a bug in these files; there's an open CSSWG issue (w3c/csswg-drafts#8634) tracking the general inability to pass page CSS into `<img>`-loaded SVGs.

Because of this, every `image::` macro that references one of these `.drawio.svg` files must include the `opts=inline` attribute, eg.:

```
image::diagrams/some-diagram.drawio.svg[Alt text,opts=inline]
```

This makes Asciidoctor inline the raw `<svg>` markup directly into the page's HTML, so it shares the page's rendering context and `light-dark()` works as intended. Without `opts=inline`, the diagram will render correctly in light mode but ignore the user's dark mode preference.

There are other workarounds, but this option has the highest cross-browser compatibility.
