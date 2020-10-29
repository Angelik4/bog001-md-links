const path = require('path');
const { validateArrayLinks } = require('./index.js');
const absolute = path.resolve('prueba.md');
const { createArrayLinks, readDocument } = require('./index.js');



const objPrueba = {
    validate: true,
    stats: true
}
const mdLinks = (ruta, options) => {
    return new Promise((resolve, reject) => {
        readDocument(ruta)
        .then((res) => {
            return createArrayLinks(res);
        })
        .then((res) => {
            if (options.validate === true) {
                const promiseValidate = validateArrayLinks(res);
                promiseValidate.then((result) => {
                    resolve(result);
                })
            } else {
                resolve(res);
            }
        })
        .catch(console.error);
    })
}
mdLinks(absolute, objPrueba);

