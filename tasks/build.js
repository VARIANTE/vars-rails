/* jshint strict:false */
/**
 * Compiles and revisions all assets (depending on the environment, i.e. debug environment
 * will skip compressions and revisions). This task also deploys compiled assets to ./public
 * so they can be served.
 *
 * @param {Boolean} debug
 * @param {Boolean} skipImageMin
 * @param {Boolean} skipCSSO
 * @param {Boolean} skipUglify
 * @param {Boolean} skipRev
 */

var config = require('./config');
var gulp = require('gulp');
var $revReplace = require('gulp-rev-replace');

gulp.task('build', ['static'], function()
{
  // If revisioning is skipped, early return because 'static' task
  // will have already deployed all assets to ./public.
  if (config.env.skipRev) return;

  // Otherwise proceed with remapping asset paths in affected
  // files using the generated manifest file.
  return gulp.src([config.paths.dist + '/**/*.' + config.patterns.styles, config.paths.dist + '/**/*.' + config.patterns.scripts, config.paths.dist + '/**/*.' + config.patterns.templates])
    .pipe($revReplace(
    {
      manifest: gulp.src(config.paths.dist + '/rev-manifest.json')
    }))
    .pipe(gulp.dest(config.paths.dist));
});
