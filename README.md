# vars-rails

VARIANTE's sample Rails app with Gulp asset pipeline, Browserify, Babel and more.

## Features

- [Gulp](http://gulpjs.com) setup replacing Sprockets
- [BrowserSync](http://www.browsersync.io) for rapid development
- [Browserify](http://browserify.org)
- [Babel](https://babeljs.io) for coding in ES6 standards
- Watchify for quick Browserify rebundling

## Usage

This assumes that the Rails app is generated without Sprockets and Turbolinks, like so:
```
$ rails new example-app -S --skip-turbolinks
```

## Tasks

```gulp --debug --serve --watch```: Builds the app in debug, serves it and watches files for changes.

```gulp --serve```: Builds the app in production and serves it (watching is not supported in production environment).

See ```gulpfile.js``` for more tasks and custom flags such as ```--skip-uglify```, ```--skip-csso```, etc.

## License

This software is released under the [MIT License](http://opensource.org/licenses/MIT).
