const { array } = require("yargs");

const arrayOfLinks = [
    {
        href: 'https://www.facelooooo.com/',
        text: 'urlPrueba',
        file: 'ejemplo.md'
    },
    {
        href: 'https://stackoverflow.com/questions/39153080/how-can-i-get-the-status-code-from-an-http-error-in-axios',
        text: 'stackoverflow',
        file: 'ejemplo.md'
    },
    {
        href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
        text: 'Uso de callbacks.',
        file: 'ejemplo.md'
    }
]

const arrayLinksValidate =
    [
        {
            href: 'https://www.facelooooo.com/',
            text: 'urlPrueba',
            file: 'ejemplo.md',
            status: 500,
            statusText: 'fail'
        },
        {
            href: 'https://stackoverflow.com/questions/39153080/how-can-i-get-the-status-code-from-an-http-error-in-axios',
            text: 'stackoverflow',
            file: 'ejemplo.md',
            status: 200,
            statusText: 'ok'
        },
        {
            href: 'https://developer.mozilla.org/es/docs/Glossary/Callback_function',
            text: 'Uso de callbacks.',
            file: 'ejemplo.md',
            status: 200,
            statusText: 'ok'
        }
    ]

    const objStats= { Total: 3, Unique: 3, Broken: 1 };

module.exports = arrayOfLinks;
module.exports = arrayLinksValidate;
module.exports = objStats;