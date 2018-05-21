# Angular stryker example

This is an example project on how to use Stryker, the mutation testing framework, in an Angular (CLI) project.

## Features

* Mutates only *your typescript code*. Not the transpiled JavaScript or 3rd party library code.
* Uses your Angular CLI webpack build (as much as possible)
* Uses karma for testing

## How to use

Clone this library and run `npm install`. After that, run `npm run stryker`.

## Enable mutation testing in your angular project

Follow these steps to enable Stryker mutation testing in your project.

1. Install 2 webpack plugins in your project: `npm i -D angular2-template-loader awesome-typescript-loader@^3`  
  *NOTE:* the Awesome typescript loader v3 is webpack 3 compatible. Update once the angular-cli is based on webpack 4
1. Install stryker with plugins: `npm i -D stryker-api stryker stryker-webpack-transpiler stryker-html-reporter stryker-typescript stryker-karma-runner`
1. Copy over the `stryker.conf.js` file and `webpack-stryker.conf.js` file from this repository.
1. Add `"stryker": "stryker run"` to your `"scripts"` config in your package.json file.
1. Give it a go: `npm run stryker`
 
## Notice

We're working on better integration with angular projects, but for now this is it. It might break at the next version, it uses some private api's of Angular. We'll keep working it.

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli).

