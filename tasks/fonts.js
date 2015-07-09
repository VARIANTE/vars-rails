/* jshint strict:false */
/**
 * Compiles and deploys fonts. Note that if this task is performed in production or asset revisioning
 * is intended, files will be deployed to ./.tmp instead to be staged for revisioning during the
 * 'static' task.
 *
 * @param {Boolean} skip-rev
 */

var config = require('./config');
var gulp = require('gulp');

gulp.task('fonts', function()
{
  return gulp.src([config.paths.src + '/assets/**/*.' + config.patterns.fonts])
    .pipe(gulp.dest(config.env.skipRev ? config.paths.dist : config.paths.tmp));
});
