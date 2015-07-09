/* jshint strict:false */
/**
 * Compiles all JavaScript bundle files. This task assumes that all bundle files are located in ./app/javascripts
 * and ignores all sub-directories. Watchify is used to speed up the rebundling process when watch is enabled.
 * Babelify is used to allow development in ES6 standards. Note that if this task is performed in production or
 * asset revisioning is intended, files will be deployed to ./.tmp instead to be staged for revisioning during the
 * 'static' task.
 *
 * @param {Boolean} debug
 * @param {Boolean} skip-uglify
 * @param {Boolean} skip-rev
 * @param {Boolean} watch
 */

var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var config = require('./config');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var through2 = require('through2');
var watchify = require('watchify');
var $if = require('gulp-if');
var $sourcemaps = require('gulp-sourcemaps');
var $uglify = require('gulp-uglify');
var $util = require('gulp-util');

gulp.task('scripts', function()
{
  function bundle(bundler, output, next)
  {
    return bundler.bundle()
      .on('error', function(err)
      {
        $util.log($util.colors.red('Browserify error: ' + err.message));

        if (next)
        {
          next();
        }
        else
        {
          this.emit('end');
        }
      })
      .pipe(source(output))
      .pipe(buffer())
      .pipe($if(config.env.debug, $sourcemaps.init({ loadMaps: true })))
      .pipe($if(!config.env.skipUglify, $uglify())).on('error', $util.log)
      .pipe($if(config.env.debug, $sourcemaps.write('./')))
      .pipe(gulp.dest(config.env.skipRev ? config.paths.dist + '/javascripts' : config.paths.tmp + '/javascripts'));
  }

  return gulp.src(config.paths.src + '/assets/javascripts/*.' + config.patterns.scripts)
    .pipe(through2.obj(function(file, enc, next)
    {
      var opts = { entries: [file.path], debug: config.env.debug, transform: [babelify] };
      var bundler = (config.env.watch) ? watchify(browserify(opts)) : browserify(opts);
      var output = file.path.replace(file.base, '');

      if (config.env.watch)
      {
        bundler.on('time', function(time)
        {
          $util.log($util.colors.green('Browserified'), output, $util.colors.magenta('in ' + time + 'ms'));
        });

        bundler.on('update', function()
        {
          bundle(bundler, output);
        });
      }

      bundle(bundler, output, next)
        .on('end', function()
        {
          next(null, file);
        });
    }));
});
