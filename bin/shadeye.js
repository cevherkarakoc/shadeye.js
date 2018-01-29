#!/usr/bin/env node

const program = require('commander');
const three = require('three');
const bs = require('browser-sync').create();

let frag = '';
let vert = '';
let obj = 'default';

program
    .version('0.1.1')
    .usage('vertexShader.vert fragmentShader.frag')
    .arguments('<vertexShader> <fragmentShader> [object]')
    .action( function (vertexShader, fragmentShader, object) {
        vert = vertexShader;
        frag = fragmentShader
        if(object) {
            obj = object;
        }
    } );

program.parse(process.argv);
if (!program.args.length) program.help();


const cwd = process.cwd();
bs.init({
    server: [
        cwd,
        __dirname+'/../lib',
        __dirname+'/../node_modules/three/build/',
        __dirname+'/../node_modules/three/examples/js/controls/',
        __dirname+'/../node_modules/three/examples/js/loaders/',
        __dirname+'/../../three/build/',
        __dirname+'/../../three/examples/js/controls/',
        __dirname+'/../../three/examples/js/loaders/'
    ],
    files: [
        cwd+'/lib/index.html',
        cwd+'/lib/render.js',
        cwd+'/'+vert,
        cwd+'/'+frag
    ],
    startPath: `index.html?frag=${frag}&vert=${vert}&obj=${obj}`
});