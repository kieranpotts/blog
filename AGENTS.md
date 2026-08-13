# Blog

A blog built as an [Antora](https://antora.org/) documentation-site
component. Posts are AsciiDoc pages under `src/modules/ROOT/pages/`,
with RSS, Atom, and JSON feeds generated alongside the site.

The blog is published at https://kieranpotts.com/thoughts/. The
[website](https://github.com/kieranpotts/website) repository is
responsible for the build and deployment.

In this project, the capitalized words REQUIRED, MUST, MUST NOT,
RECOMMENDED, SHOULD, SHOULD NOT, OPTIONAL, and MAY are to be
interpreted as described in
[IETF RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

## Tech stack

- AsciiDoc, built with [Antora](https://antora.org/) (see `src/antora.yml`).
- The shared [`kieranpotts/pre-commit-hooks`](https://github.com/kieranpotts/pre-commit-hooks)
  `validate-commit-message` hook, wired in via the `commit-msg` git hook.
- GitHub Actions, for commit-message validation and label sync.

## Project structure

- **[src/antora.yml](./src/antora.yml)** \
  Antora component descriptor (`name: blog`, start page, nav).

- **[src/modules/ROOT/pages/](./src/modules/ROOT/pages)** \
  Blog posts, one `.adoc` file per post, plus `index.adoc` and `404.adoc`.

- **[src/modules/ROOT/nav.adoc](./src/modules/ROOT/nav.adoc)** \
  Site navigation, referenced from `antora.yml`.

- **[src/feeds/](./src/feeds)** \
  Generated `rss.xml`, `atom.xml`, and `feed.json` syndication feeds.

- **[src/docinfo.html](./src/docinfo.html)**, **[src/docinfo-footer.html](./src/docinfo-footer.html)** \
  Injected HTML head/footer content for the built site.

- **[.pre-commit-config.yaml](./.pre-commit-config.yaml)** \
  Pre-commit hooks configuration, consuming the shared
  `kieranpotts/pre-commit-hooks` `validate-commit-message` hook.

## Rules

- New posts MUST be added as `.adoc` files under
  `src/modules/ROOT/pages/` and linked from `src/modules/ROOT/nav.adoc`.

- Commit messages MUST follow the `<type>: <description>` format
  enforced by the shared `validate-commit-message` pre-commit hook and CI.

## References

The following technical standards apply.

- **[TS-28: AsciiDoc](https://kieranpotts.com/standards/028)**
- **[TS-9: Version Control](https://kieranpotts.com/standards/009)**
- **[TS-19: Search Engine Optimization (SEO)](https://kieranpotts.com/standards/019)**
