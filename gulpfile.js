/* Gulp packages. */
import gulp from 'gulp'
import asciidoctor from '@asciidoctor/gulp-asciidoctor'

/* Other vendor dependencies. */
import browserSync from 'browser-sync'
import { deleteAsync } from 'del'

/* Basic configuration. */
const src_dir = 'src'
const dist_dir = 'dist'

/* Delete the contents of the `dist` directory without actually
deleting the `dist` directory itself. */
gulp.task('clean', async (done) => {
  await deleteAsync(
    `${dist_dir}/**/*`,
    {
      force: true
    }
  )
  done()
})

/* Transform AsciiDoc files to custom templates using AsciiDoctor.js.
https://docs.asciidoctor.org/asciidoctor.js/latest/
https://github.com/asciidoctor/gulp-asciidoctor/blob/main/docs/modules/ROOT/pages/index.adoc */
gulp.task('adoc', () => {
  return gulp.src(`${src_dir}/[^_]*.adoc`, { base: `${src_dir}` })
    .pipe(asciidoctor({
      safe: 'safe',
      doctype: 'article',
      standalone: true,
      template_dirs: 'tpl',
      /* https://docs.asciidoctor.org/asciidoc/latest/attributes/document-attributes-ref/ */
      attributes: [
        'nofooter',
        'stylesheet=./_/styles/index.css',
        'linkcss',
        'favicon',
      ]
    }))
    .pipe(gulp.dest(dist_dir))
})

/* Copy these files verbatim. */
gulp.task('verbatim', () => {
  return gulp.src([
    `${src_dir}/_headers`,
    `${src_dir}/_redirects`,
    `${src_dir}/favicon.ico`,
    `${src_dir}/robots.txt`,
  ])
  .pipe(gulp.dest(dist_dir))
})

/* Copy the contents of the `_` ("includes") directory. */
gulp.task('includes', () => {
  return gulp.src(`${src_dir}/_/**/*`, { base: `${src_dir}/_` })
  .pipe(gulp.dest(`${dist_dir}/_`))
})

/* Dev server with live-reload.
https://browsersync.io/
https://browsersync.io/docs/options/ */
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

/* Watch certain files and rerun specific bits of the build pipeline in response. */
gulp.task('watch', (done) => {
  gulp.watch(`${src_dir}/*.adoc`, gulp.series('adoc'))
  gulp.watch(`${src_dir}/_/**/*`, gulp.series('includes'))
  done()
})

/* Start development server. */
gulp.task('start', gulp.series('build', 'browser-sync', 'watch'))
