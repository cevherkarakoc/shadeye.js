#!/usr/bin/env node

const program = require('commander');
const three = require('three');
const bs = require('browser-sync').create();

let frag = '';
let vert = '';

program
    .version('0.0.3')
    .usage('vertexShader.vert fragmentShader.frag')
    .arguments('<vertexShader> <fragmentShader>')
    .action( function (vertexShader, fragmentShader) {
        vert = vertexShader;
        frag = fragmentShader
    } );

program.parse(process.argv);
if (!program.args.length) program.help();


const cwd = process.cwd();
bs.init({
    server: [cwd,__dirname+'/../lib',__dirname+'/../node_modules/three/build/',__dirname+'/../../three/build/'],
    files: [
        cwd+'/lib/index.html',
        cwd+'/lib/render.js',
        cwd+'/'+vert,
        cwd+'/'+frag
    ],
    startPath: `index.html?frag=${frag}&vert=${vert}`
});