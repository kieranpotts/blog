#!/usr/bin/env node
'use strict'

/**
 * Validate that every post is both dated and listed on the index page.
 *
 * Every page under src/modules/ROOT/pages/ is a post, except index.adoc and
 * 404.adoc. Each post MUST:
 *
 *   - Have a parseable `D Month YYYY` date in its author line. The website
 *     repo's feed builder (src/lib/feeds/posts.js) parses the date from this
 *     same line; without one, the post silently never reaches any feed.
 *
 *   - Be listed on index.adoc — per the repo's own README, nothing on the
 *     site links to a post unless it's in the index.
 */

const fs = require('fs')
const path = require('path')

const PAGES_DIR = path.join(__dirname, '..', '..', 'src', 'modules', 'ROOT', 'pages')
const INDEX_FILE = path.join(PAGES_DIR, 'index.adoc')
const EXCLUDED_PAGES = new Set(['index.adoc', '404.adoc'])

/* Keep DATE_RX in sync with the website repo's src/lib/feeds/posts.js. */
const DATE_RX = /\b(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\b/
const MONTHS = new Set([
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
])

function hasParseableDate (author) {
  if (!author) return false
  const m = DATE_RX.exec(author)
  return !!(m && MONTHS.has(m[2].toLowerCase()))
}

/* The author line is the second non-blank line of the document, directly
under the `= Title` line, per the Asciidoctor document header convention
used throughout this repo. */
function readAuthorLine (file) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  const titleIdx = lines.findIndex((l) => l.startsWith('= '))
  if (titleIdx === -1) return ''
  return (lines[titleIdx + 1] || '').trim()
}

function listedPages (indexContents) {
  const rx = /xref:([\w-]+\.adoc)\[/g
  const pages = new Set()
  let m
  while ((m = rx.exec(indexContents))) pages.add(m[1])
  return pages
}

function main () {
  const indexContents = fs.readFileSync(INDEX_FILE, 'utf8')
  const listed = listedPages(indexContents)

  const allPages = fs.readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith('.adoc') && !EXCLUDED_PAGES.has(f))

  const errors = []

  for (const page of allPages) {
    const author = readAuthorLine(path.join(PAGES_DIR, page))

    if (!hasParseableDate(author)) {
      errors.push(
        `${page}: no parseable 'D Month YYYY' date in its author line ('${author}') ` +
        `— it will not appear in any feed.`
      )
    }

    if (!listed.has(page)) {
      errors.push(`${page}: not listed on index.adoc — it will be unreachable from the site.`)
    }
  }

  for (const page of listed) {
    if (!allPages.includes(page)) {
      errors.push(`index.adoc references '${page}', which does not exist under ${path.relative(process.cwd(), PAGES_DIR)}/.`)
    }
  }

  if (errors.length) {
    for (const e of errors) console.error(`::error::${e}`)
    process.exit(1)
  }

  console.log(`OK — checked ${allPages.length} page(s), ${listed.size} listed on index.adoc.`)
}

main()
