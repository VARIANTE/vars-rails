/* jshint strict:false */
/**
 * Serves the app locally using Rails' WEBrick server proxied by BrowserSync for live reloading. In production,
 * watch option is not supported. This is meant for development only.
 *
 * @param {Boolean} debug
 * @param {Number}  port
 * @param {Boolean} watch
 */

var browserSync = require('browser-sync');
var config = require('./config');
var gulp = require('gulp');
var sequence = require('run-sequence');
var spawn = require('child_process').spawn;
var $util = require('gulp-util');

gulp.task('serve', function()
{
  if (config.env.watch && !config.env.debug)
  {
    $util.log($util.colors.yellow('Watch is not supported in production. Please specify ') + '--debug' + $util.colors.yellow(' instead.'));
    return;
  }

  var port = (typeof config.env.port === 'number') ? config.env.port : 9000;

  if (config.env.debug)
  {
    spawn('rails', ['server'], { stdio: 'inherit' });
  }
  else
  {
    spawn('rails', ['server', '-e', 'production'], { stdio: 'inherit' });
  }

  browserSync(
  {
    notify: false,
    proxy: 'localhost:3000',
    port: port
  });

  if (config.env.watch)
  {
    gulp.watch(config.paths.src + '/assets/**/*.' + config.patterns.images, function()
    {
      sequence('images', browserSync.reload);
    });

    gulp.watch(config.paths.src + '/assets/**/*.' + config.patterns.videos, function()
    {
      sequence('videos', browserSync.reload);
    });

    gulp.watch([config.paths.src + '/assets/**/*.' + config.patterns.styles, config.paths.vendor + '/assets/**/*.' + config.patterns.styles], function()
    {
      sequence('styles', browserSync.reload);
    });

    gulp.watch(config.paths.src + '/assets/**/*.' + config.patterns.fonts, function()
    {
      sequence('fonts', browserSync.reload);
    });

    gulp.watch(config.paths.dist + '/**/*.' + config.patterns.scripts, browserSync.reload);
    gulp.watch(config.paths.src + '/**/*.' + config.patterns.templates, browserSync.reload);
  }
});
