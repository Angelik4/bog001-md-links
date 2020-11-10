#! /usr/bin/env node
const path = require('path');
const absolute = path.resolve('prueba.md');
const { statsLinks } = require('./index.js');
const { mdLinks } = require('./mdLinks.js');
const package = require('./package.json');
const { Command } = require('commander');
const program = new Command(package.name);


//Readme con objetivos listados 
//node cli.js prueba.md esto debe enviar los links del archivo
// node cli.js prueba.md --validate (imprimir en consola los links validados con los estados)
/* node cli.js prueba.md --stats (debe imprimir las estadisticas con dos caracteristicas Total: 3
Unique: 3 ) */
//node cli.js prueba.md --stats --validate arroja los dos atributos anteriores mas broken 

program
    .option('-v, --validate', )
    .option('-s, --stats')

program.parse(process.argv);

if (!program.validate && !program.stats) {
    mdLinks(process.argv[2], { validate: false })
        .then((res) => {
            console.log(res);
        })
} 

if (!program.validate && !program.stats) {
    mdLinks(process.argv[2], { validate: true })
        .then((links) => {
            console.log(links);
        })
}

if (!program.validate && !program.stats) {
    mdLinks(process.argv[2], {validate: true})
    .then((stats) => {
        resultStats = statsLinks(stats);
    console.log(resultStats);
    })
}
