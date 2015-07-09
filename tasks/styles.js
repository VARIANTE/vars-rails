/* jshint strict:false */
/**
 * Compiles all stylesheets. Note that if this task is performed in production or asset revisioning
 * is intended, files will be deployed to ./.tmp instead to be staged for revisioning during the
 * 'static' task.
 *
 * @param {Boolean} debug
 * @param {Boolean} skip-csso
 * @param {Boolean} skip-rev
 */

var autoprefixer = require('autoprefixer-core');
var config = require('./config');
var gulp = require('gulp');
var $csso = require('gulp-csso');
var $if = require('gulp-if');
var $postcss = require('gulp-postcss');
var $sass = require('gulp-sass');
var $sourcemaps = require('gulp-sourcemaps');
var $util = require('gulp-util');

gulp.task('styles', function()
{
  return gulp.src(config.paths.src + '/assets/stylesheets/application.' + config.patterns.styles)
    .pipe($if(config.env.debug, $sourcemaps.init()))
    .pipe($sass(
    {
      outputStyle: 'nested',
      includePaths: ['node_modules', config.paths.src + '/assets/stylesheets']
    }).on('error', function(err)
    {
      $util.log($util.colors.red('Sass error: ' + err.message));
      this.emit('end');
    }))
    .pipe($postcss([autoprefixer({ browsers: ['last 2 version', 'ie 9'] })]))
    .pipe($if(!config.env.skipCSSO, $csso()))
    .pipe($if(config.env.debug, $sourcemaps.write()))
    .pipe(gulp.dest(config.env.skipRev ? config.paths.dist + '/stylesheets' : config.paths.tmp + '/stylesheets'));
});
