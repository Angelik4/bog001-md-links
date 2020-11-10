const { mdLinks } = require('./mdLinks.js');
const statsLinks = require('./index.js');
const { arrayOfLinks, arrayLinksValidate, arrayStats } = require('./mocks.js');
const path = require('path');

describe('mdLinks', () => {
    it('Deberia ser una funcion', () => {
        expect(typeof mdLinks).toEqual('function');
    });
});

describe('Mostrar las Estadisticas de un array de Objetos', () => {
    xtest('Igualdad de Objetos que recibe', () => {
        const respuesta = {
            total: 3,
            unique: 3
        };
        expect(statsLinks(arrayOfLinks)).toEqual(respuesta)
    })

    xtest('Incluir los links rotos', () => {
        const broken = true;
        expect(statsLinks(arrayLinksValidate, broken)).toStrictEqual(arrayStats)
    })
});

describe('Probando Promesa', () => {
    xtest('Retorno de un array de objetos', done => {
        const ruta = path.resolve('./ejemplo.md');
        return mdLinks(ruta).then(data => {
            expect(data).toStrictEqual(arrayOfLinks);
            done();
        });
    });

    test('Resuelve un array de objetos validados', done => {
        return mdLinks(ruta, options).then(res => {
            console.log(res)
            expect(res).toBe(arrayLinksValidate)
            done();
        });
    });
});

it('Should read a Markdown file and extract the links from it', () => {
    const ruta = 'ejemplo.md'
    return mdLinks(ruta, { validate: true }).then((links) => {
        expect(links).toHaveLength(3);
        expect(links).toBe(arrayOfLinks);
    });
});

