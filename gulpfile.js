/* jshint strict:false */
/**
 * This file only contains the default task. See ./tasks for individual sub-tasks. To add a new
 * sub-task, simply create a new file in ./tasks and it will be automatically included here. For
 * global config settings for Gulp tasks, see ./tasks/config.js.
 */

// Require all gulp tasks.
require('require-dir')('./tasks');

// Import packages.
var config = require('./tasks/config');
var gulp = require('gulp');
var sequence = require('run-sequence');

/**
 * Default Gulp task. This is the task that gets executed when you run the shell command 'gulp'.
 * This task will wipe the compiled assets and rebuild them.
 *
 * @param {Boolean} debug
 * @param {Boolean} skipImageMin
 * @param {Boolean} skipCSSO
 * @param {Boolean} skipUglify
 * @param {Boolean} skipRev
 * @param {Boolean} serve
 * @param {Number}  port
 * @param {Boolean} watch
 */
gulp.task('default', function(callback)
{
  var seq = ['clean', 'build'];
  if (config.env.serve) seq.push('serve');
  seq.push(callback);

  sequence.apply(null, seq);
});
