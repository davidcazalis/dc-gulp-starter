# dc-gulp-starter
It's all in the title. A starter kit, based on Gulp, and mostly built to fit my needs.

## Default structure

	├── src			// sources files
	├── build		// build files
	├── public	// production-ready files
	└── gulp		// gulp config and tasks

## Tasks

### Build files

	npm run build

Run gulp default task. It will compile every files and put them to `./build`.

	npm run development

Launch build task and create a local server, watch files and hotload with **[BrowserSync](http://www.browsersync.io/)**.


### Build production-ready files

	npm run production

Run gulp default task and then compressed files to `./public`. You can test your production files with

	npm run demo

Create a local server for `./public` and open a tunnel through a random Public URL with **[localtunnel.me](http://localtunnel.me/)**

### Lint files

	npm run lint

Test your HTML, Sass and JavaScript files with lint tasks.

### Versions

Production task will increment versions of your `package.json` and `bower.json` with minor bump.

	npm run vminor
	// Increment versions by 0.1.0

	npm run vmajor
	// Increment versions by 1.0.0

	npm run vpatch
	// Increment versions by 0.0.1

	npm run vreset
	// Reset versions to 0.0.0
