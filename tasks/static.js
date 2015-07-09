/* jshint strict:false */
/**
 * Executes all asset compilation tasks and applies revisioning if options allow. If revisioning is enabled,
 * all assets will be deployed to ./public. At that point, it is expected you run the 'build' task to complete
 * the revisioning process, where file paths will be remapped in affected files.
 *
 * @param {Boolean} debug
 * @param {Boolean} skip-rev
 */

var config = require('./config');
var gulp = require('gulp');
var $rev = require('gulp-rev');
var $size = require('gulp-size');

gulp.task('static', ['images', 'videos', 'fonts', 'styles', 'scripts'], function()
{
  if (config.env.skipRev) return;

  return gulp.src([config.paths.tmp + '/**/*'])
    .pipe($rev())
    .pipe(gulp.dest(config.paths.dist))
    .pipe($size(
    {
      title: 'static',
      gzip: true
    }))
    .pipe($rev.manifest())
    .pipe(gulp.dest(config.paths.dist));
});
