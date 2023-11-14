/* HOST DEPENDENCIES */
import path from 'node:path'

/* VENDOR DEPENDENCIES: GENERAL */
import browserSync from 'browser-sync'
import { deleteAsync } from 'del'
import through from 'through2'

/* VENDOR DEPENDENCIES: GULP */
import gulp from 'gulp'
import asciidoctor from '@asciidoctor/gulp-asciidoctor'
import gap from 'gulp-append-prepend'
import template from 'gulp-template'

import config from './config.json' assert { type: 'json' }

const src_dir = 'src'
const dist_dir = 'dist'

// const baseUrl = () => {
//   if (process.env.NODE_ENV === 'development') {
//     return 'http://localhost:8080'
//   }

//   const scheme = config.https ? 'https' : 'http'
//   return `${scheme}://kieranpotts.com`
// }

// const base_url = baseUrl()

/*
Delete the contents of the `dist` directory without actually
deleting the `dist` directory itself.
*/
gulp.task('clean', async (done) => {
  await deleteAsync(
    `${dist_dir}/**/*`,
    {
      force: true
    }
  )
  done()
})

/* Transform AsciiDoc files to custom templates. */
// let slug = '/...'
gulp.task('adoc', () => {
  return gulp.src(`${src_dir}/contents/*.adoc`, { base: `${src_dir}/contents` })
    .pipe(asciidoctor({
      standalone: true
    }))
    // .pipe(gap.prependFile(`${src_dir}/templates/header.html`))
    // .pipe(gap.appendFile(`${src_dir}/templates/footer.html`))
    // .pipe(through.obj((file, enc, cb) => {
    //   const file_path = path.relative(path.join(file.cwd, file.base), file.path)
    //   slug = (`/${file_path}`)
    //     .slice(0, -5) // Remove ".adoc"
    //     .replace('\\', '/') // Change Windows path backslashes to URL forward slashes
    //     .replace(/\/index$/, '') || '/' // Remove "index" from end, if final URL empty set to "/"
    //   cb(null, file)
    // }))
    // .pipe(template({
    //   base_url,
    //   slug,
    //   title: config.title,
    //   description: config.description
    // }))
    .pipe(gulp.dest(dist_dir))
})

/* Copy these files verbatim. */
gulp.task('verbatim', () => {
  return gulp.src([
    `${src_dir}/contents/_headers`,
    `${src_dir}/contents/_redirects`,
    `${src_dir}/contents/favicon.ico`,
    `${src_dir}/contents/feed.rss`,
    `${src_dir}/contents/robots.txt`,
  ])
  .pipe(gulp.dest(dist_dir))
})

/* Copy the contents of the `_` ("includes") directory. */
gulp.task('includes', () => {
  return gulp.src(`${src_dir}/contents/_/**/*`, { base: `${src_dir}/contents/_` })
  .pipe(gulp.dest(`${dist_dir}/_`))
})

/*
@deprecated
Use PostCSS to transform the CSS files.
https://www.npmjs.com/package/gulp-postcss
*/
// gulp.task('css', (done) => {
//   const plugins = [
//     postcssImport(),
//     autoprefixer(), // Will use .browserslistrc file
//     cssnano()
//   ]
//   gulp.src(`${src_dir}/styles/[^_]*.css`)
//     .pipe(postcss(plugins))
//     .pipe(gulp.dest(`${build_dir}/assets/styles/`))
//   done()
// })

/*
Dev server with live-reload.
https://browsersync.io/
https://browsersync.io/docs/options/
*/
gulp.task('browser-sync', (done) => {
  browserSync({
    open: false,
    server: {
      baseDir: dist_dir,
      index: 'index.html',
      serveStaticOptions: {
        extensions: ["html"]
      }
    },
    port: 8080,
    ui: {
      port: 8081
    }
  })
  done()
})

/* Build pipeline. */
gulp.task('build', gulp.series(
  'clean',
  'includes',
  'adoc',
  'verbatim',
))

gulp.task('watch', (done) => {
  gulp.watch(`${src_dir}/contents/*.adoc`, gulp.series('adoc'))
  gulp.watch(`${src_dir}/contents/_/**/*`, gulp.series('includes'))
  done()
})

/* Start development server. */
gulp.task('start', gulp.series('build', 'browser-sync', 'watch'))
