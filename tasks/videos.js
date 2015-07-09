/* jshint strict:false */
/**
 * Compiles and deploys videos. Note that if this task is performed in production or asset revisioning
 * is intended, files will be deployed to ./.tmp instead to be staged for revisioning during the
 * 'static' task.
 *
 * @param {Boolean} skip-rev
 */

var config = require('./config');
var gulp = require('gulp');

gulp.task('videos', function()
{
  return gulp.src([config.paths.src + '/assets/**/*' + config.patterns.videos])
    .pipe(gulp.dest(config.env.skipRev ? config.paths.dist : config.paths.tmp));
});
