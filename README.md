# dc-gulp-starter
It's all in the title. A starter kit, based on Gulp, and mostly built to fit my needs. Heavily inspired by the delicious [gulp-starter](https://github.com/vigetlabs/gulp-starter). You should check it out if you want something more sophisticated.

## Features

* **HTML:** Built with [Jade](http://jade-lang.com/)
	* Variables stored in `package.json` and `./gulp/config.json`
* **CSS:** Built with [Sass](http://sass-lang.com/) (Libsass)
	* Autoprefixer
* **Images:**
	* SVG Sprite create from SVGs in `src/sprites`
* **JS:**
	* Bundle create with [Browserify](http://	browserify.org/)
	* Uglify
* **Fonts:**
	* Icon fonts create from SVGs in `src/icons`
* **Development:**
	* Source maps
	* Error desktop notifications
	* Local server, watch and hotload with [BrowserSync]	(http://www.browsersync.io/)
* **Production:**
	* Assets minified and optimized (Fonts, JavaScript, CSS and images)
	* Add banner on JS and CSS, with last build date and version
	* Increment version in `package.json` and `bower.json`
	* Demo mode, with local server on `./public` folder and public URL to share with [localtunnel.me](http://localtunnel.me/).
* **Validation:**
	* Lint CSS, JS and HTML files.

## Installation
	git clone https://github.com/davidcazalis/dc-gulp-starter.git superDuperProject
	cd superDuperProject
	npm install
	npm run build

## Default structure

	├── src
	├── build
	├── public
	└── gulp

* `src` Sources files
* `build` Compiled files
* `public` Production-ready files
* `gulp` Gulp configurations files and tasks

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
