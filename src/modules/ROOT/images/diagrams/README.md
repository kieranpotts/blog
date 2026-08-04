# Diagrams

These `*.svg` files are drafted in [draw.io](https://www.drawio.com/), then exported as SVG and hand-edited so they become the source of truth in their own right (the draw.io `content` metadata is stripped, so they are no longer re-openable as draw.io files — see "Editing an existing diagram" below).

Styling conventions used across these diagrams:

- Font: inherited from the embedding page (`font-family: inherit` on each label's `<div>`), 14px, bold. This lets a diagram's text render in whatever font the page itself uses, rather than a fixed font baked into the diagram.

- Colors use `light-dark()` CSS values (e.g. `light-dark(#000000, #ffffff)`) so shapes and text adapt to light/dark mode automatically.

- Shape strokes: 2px, black (adapting via `light-dark()`).

- Shape fills: white in light mode, dark in dark mode, via the same `light-dark()` pattern.

- The draw.io "text is not SVG" fallback (a `<switch>` wrapping a truncated `<text>` element, used only if `foreignObject` isn't supported) is removed, since `opts=inline` guarantees these always render via the `foreignObject` path in practice.

The SVGs are inlined/embedded into the document at build time (`opts=inline`). The reason for this is to guarantee the highest level of cross-browser compatibility for light/dark mode switches (and now, font inheritance) in the images. Both `light-dark()` and `font-family: inherit` only take effect when the SVG's CSS is evaluated in the context of the embedding page. If an SVG is referenced as a normal raster-style image (ie. rendered to an `<img src="...">` tag), it gets its own independent, opaque rendering context that does not inherit the page's styles — so `light-dark()` silently resolves to its light-mode value, and `font-family: inherit` resolves to the browser default, regardless of the embedding page. This is a browser/spec limitation, not a bug in these files; there's an open CSSWG issue (w3c/csswg-drafts#8634) tracking the general inability to pass page CSS into `<img>`-loaded SVGs.

Because of this, every `image::` macro that references one of these `.svg` files must include the `opts=inline` attribute, eg.:

```
image::diagrams/some-diagram.svg[Alt text,opts=inline]
```

This makes Asciidoctor inline the raw `<svg>` markup directly into the page's HTML, so it shares the page's rendering context and both `light-dark()` and font inheritance work as intended. Without `opts=inline`, the diagram will render correctly in light mode, in a fixed font, but ignore the user's dark mode preference.

There are other workarounds, but this option has the highest cross-browser compatibility.

## Editing an existing diagram

Because the draw.io source metadata is stripped from these files, they can't be reopened directly in draw.io. To make a structural edit:

1. Recreate (or find a saved copy of) the diagram in draw.io, make the change, and re-export as SVG.
2. Re-apply the conventions above: replace every `font-family: &quot;Helvetica&quot;;` with `font-family: inherit;`, and remove the `<switch>`/fallback `<text>`/trailing link block that draw.io adds after each `foreignObject`.
3. Strip the `content="..."` attribute from the root `<svg>` element (the embedded draw.io XML), since these files are no longer meant to be draw.io sources.

For small text or color tweaks, it's usually simpler to hand-edit the SVG directly.
