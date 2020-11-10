const { validateArrayLinks } = require('./index.js');
const { createArrayLinks, readDocument } = require('./index.js');


const mdLinks = (ruta, options) => {
    console.log(ruta);
    return new Promise((resolve, reject) => {
        readDocument(ruta)
        .then((res) => {
            return createArrayLinks(res, ruta);
        })
        .then((res) => {
            if (options.validate === true) {
                const promiseValidate = validateArrayLinks(res);
                promiseValidate.then((result) => {
                    resolve(result);
                })
            }
            else {
                resolve(res);
            }
        })
        .catch(console.error);
    })
}

module.exports.mdLinks = mdLinks;
