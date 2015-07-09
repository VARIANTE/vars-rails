/* jshint strict:false */
/**
 * Compiles and deploys images. Note that if this task is performed in production or asset revisioning
 * is intended, files will be deployed to ./.tmp instead to be staged for revisioning during the
 * 'static' task.
 *
 * @param {Boolean} debug
 * @param {Boolean} skip-imagemin
 * @param {Boolean} skip-rev
 */

var config = require('./config');
var gulp = require('gulp');
var $cache = require('gulp-cache');
var $if = require('gulp-if');
var $imagemin = require('gulp-imagemin');

gulp.task('images', function()
{
  return gulp.src([config.paths.src + '/assets/**/*' + config.patterns.images])
    .pipe($if(!config.env.skipImageMin, $cache($imagemin(
    {
      progressive: true,
      interlaced: true,
      svgoPlugins: [
      {
        cleanupIDs: false
      }]
    }))))
    .pipe(gulp.dest(config.env.skipRev ? config.paths.dist : config.paths.tmp));
});
