# Thoughts

**Source content for my blog, published at https://kieranpotts.com/thoughts.**

## Publishing a new post

This repo is an Antora content module (component `thoughts`). It has no build of its own. It's aggregated and built by the [`website`](https://github.com/kieranpotts/website) repo, which also generates the RSS/Atom/JSON feeds from these pages.

To publish a new post:

1. Add a new `.adoc` file under `src/modules/ROOT/pages/`.

2. Give it an author line with a `D Month YYYY` date, eg:

   ```
   = Post title
   Kieran Potts, 28 December 2025
   ```

   The feed builder in the `website` repository parses the date out of this author line. A post without a recognizable date in this format will not appear in any feeds (RSS, Atom, etc.). The `Validate Post Dates` CI check (`.github/workflows/validate-post-dates.yaml`) catches this — and the inverse, a dated post missing from the index — on every PR and push to `latest/dev`.

3. Add `:description:` and `:docinfo: shared` / `:nofooter:` attributes, matching the existing posts — `:description:` becomes the feed entry's description.

4. List the post on `src/modules/ROOT/pages/index.adoc`, newest first, following the existing `xref:` + small date-line pattern. This index is the only post listing on the site. Nothing on the website itself links to a post unless it's listed here.

5. Commit and push the changes. Merge into `latest/dev`, eg. via a PR. This queues the blog post for publication, which is scheduled to happen overnight unless a fresh deployment is manually triggered beforehand (via the `website` repo's GitHub workflows).

6. To preview the changes, rebuild the `website` repo. Confirm the new post shows up on the index page and in `/feeds/rss.xml`, `/feeds/atom.xml`, and `/feeds/feed.json`. (The `website` repo fetches content sources from the `latest/dev` branches of the remote `thoughts` repository – it is not currently possible to preview local changes.)

Alternatively, to preview a draft post *before* merging its PR: push the draft to a branch in this repo, then manually run the `website` repo's `Netlify Preview` GitHub Actions workflow with that branch name. This builds the aggregated site against the draft branch, instead of `latest/dev`, and posts a real preview URL.

-----

Copyright © 2020-present Kieran Potts, [CC-BY-SA-4.0 license](./LICENSE.txt)
