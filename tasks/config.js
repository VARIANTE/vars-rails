/* jshint -W069, strict:false */
/**
 * This file contains all config settings for Gulp tasks.
 */

var env = require('gulp-util').env;

/**
 * @option
 *
 * Specifies whether a task should be executed in the debug environment.
 * Tasks may perform different behavior when specified to run in debug.
 *
 * @type {Boolean}  --debug, --d, GULP_CONFIG_DEBUG in env
 */
var debug = env['debug'] || env['d'] || process.env.GULP_CONFIG_DEBUG;

/**
 * @option
 *
 * Specifies whether image compression should be skipped. In debug, this
 * is always true.
 *
 * @type {Boolean}  --skip-imagemin, --si
 */
var skipImageMin = env['skip-imagemin'] || env['si'] || debug;

/**
 * @option
 *
 * Specifies whether CSS minification should be skipped. In debug, this
 * is always true.
 *
 * @type {Boolean}  --skip-csso, --sc
 */
var skipCSSO = env['skip-csso'] || env['sc'] || debug;

/**
 * @option
 *
 * Specifies whether JavaScript uglification should be skipped. In debug, this
 * is always true.
 *
 * @type {Boolean}  --skip-uglify, --su
 */
var skipUglify = env['skip-uglify'] || env['su'] || debug;

/**
 * @option
 *
 * Specifies whether asset revisioning should be skipped. In debug, this
 * is always true.
 *
 * @type {Boolean}  --skip-rev, --sr
 */
var skipRev = env['skip-rev'] || env['sr'] || debug;

/**
 * @option
 *
 * Specifies whether files should be watched. This option is only available
 * in designated tasks. When enabled, modified files will automatically be pipelined
 * into their corresponding compile tasks and will trigger a browser refresh on
 * complete.
 *
 * @type {Boolean}  --watch, --w
 */
var watch = env['watch'] || env['w'];

/**
 * @option
 *
 * Specifies the port which BrowserSync will use when serving the app locally. Note
 * that this value only affects the port that BrowserSync uses, not WEBrick (Rails server).
 * This option is only available if you are executing a Gulp task that serves the app.
 * The default value is 9000.
 *
 * @type {Number}   --port, --p
 */
var port = env['port'] || env['p'];

/**
 * @option
 *
 * Specifies whether the app will be served at the end of designated tasks.
 *
 * @type {Boolean}  --serve, --s
 */
var serve = env['serve'] || env['s'];

module.exports =
{
  /**
   * Common extensions per file type for glob patterns.
   */
  patterns:
  {
    images: '{jpg,jpeg,gif,png,svg,ico}',
    videos: '{ogv,mp4}',
    scripts: '{js,js.erb}',
    sourcemaps: '{css.map,js.map}',
    styles:'{css,scss,sass,css.erb,scss.erb,sass.erb}',
    templates: '{html,shtml,htm,html.erb,asp,php,md}',
    data: '{json,yml,csv}',
    fonts: '{eot,svg,ttf,woff,woff2}'
  },

  /**
   * Common paths used throughout the Gulp pipeline.
   */
  paths:
  {
    src: 'app',
    tmp: '.tmp',
    vendor: 'vendor',
    dist: 'public'
  },

  /**
   * Value of task options.
   */
  env:
  {
    debug: debug,
    skipImageMin: skipImageMin,
    skipCSSO: skipCSSO,
    skipUglify: skipUglify,
    skipRev: skipRev,
    watch: watch,
    port: port,
    serve: serve
  }
};
