module.exports = () => {
  // ...
};
const path = require('path');
const fs = require('fs');
const extension = path.extname('README.md');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const marked = require('marked');
const axios = require('axios');
const { resolve } = require('path');
const { verify } = require('crypto');

const readDocument = (ruta) => {
  return new Promise((resolve, reject) => {
    fs.readFile(ruta, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        reject('error: ', err)
      } else {
        resolve(data)
      }
    });
  })
}



const createArrayLinks = (text, ruta) => {
  const tokens = marked.lexer(text);
  let html = marked.parser(tokens);
  const dom = new JSDOM(html);
  const seeDocument = dom.window.document.querySelectorAll("a");
  let arrayLinks = [];
  for (let link of seeDocument) {
    if (/^(ftp|http|https):\/\/[^ "]+$/.test(link.href)) {
      let objLink = {
        href: link.href,
        text: link.textContent,
        file: ruta,
      }
      arrayLinks.push(objLink);
    }
  }
  return arrayLinks
}

const validateArrayLinks = (array) => {
validateArray = array.map((obj) => {
  let objArray = obj.href
    let validateObject = {
      href: obj.href,
      text: obj.text,
      file: obj.file,
    }
    return axios.get(objArray)
        .then((response) => {
          if (response.status != 200) {
            validateObject.status = response.status;
            validateObject.statusText = "fail";
            return validateObject;
          } else {
            validateObject.status = response.status;
            validateObject.statusText = "ok";
            return validateObject;
          }
        })
        .catch((error) => {
          validateObject.status = 500;
          validateObject.statusText = "fail";
          return validateObject;
        })
})
  return Promise.all(validateArray) .then(values => { 
    return values;
  })  
}



const statsLinks = (arrayValidate, showBroken) => {
let uniqueValue = [...new Set(arrayValidate)];
let totalLinks = arrayValidate.length;
let brokenValue = arrayValidate.filter((brokeLinks) => {
  return brokeLinks.statusText == "fail";
})
    const elementStats = {
      Total: totalLinks,
      Unique: uniqueValue.length}
    
      if(showBroken) {
        
        elementStats.broken = totalBroken
      } 
        return elementStats
      }

module.exports.readDocument = readDocument;
module.exports.validateArrayLinks = validateArrayLinks;
module.exports.createArrayLinks= createArrayLinks;
module.exports.statsLinks = statsLinks;
