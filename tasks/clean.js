/* jshint strict:false */
/**
 * Wipes out all compiled assets and associated files as well as clearing Gulp caches.
 */

var config = require('./config');
var del = require('del');
var gulp = require('gulp');
var $cache = require('gulp-cache');

gulp.task('clean', function(callback)
{
  del([config.paths.tmp, config.paths.dist + '/{javascripts,stylesheets,images,videos,fonts,rev-manifest.json}'], function()
  {
    $cache.clearAll(callback);
  });
});
