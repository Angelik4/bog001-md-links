module.exports = () => {
  // ...
};
const path = require('path');
const fs = require('fs');
const extension = path.extname('README.md');
const absolute = path.resolve('prueba.md');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const marked = require('marked');
const axios = require('axios');
const { resolve } = require('path');
const { verify } = require('crypto');

const readDocument = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(absolute, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        reject('error: ', err)
      } else {
        resolve(data)
      }
    });
  })
}
readDocument()
  /*.then((result) => {
    const resultArrayLinks = createArrayLinks(result);
    //console.log(resultArrayLinks);
    const resultValidateLinks = validateArrayLinks(resultArrayLinks);
    resultValidateLinks.then((res)=>{
      console.log(res);
    })
    //console.log("resultado validacion ", resultValidateLinks);
    const resultArrayStats = statsLinks(resultArrayLinks);
    console.log(resultArrayStats); 
  }) 
  .catch(
    (err) => {
      console.log(err);
    });*/


const createArrayLinks = (text) => {
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
        file: absolute,
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



const statsLinks = (arrayValidate) => {
let uniqueValue = [...new Set(arrayValidate)];
let totalLinks = arrayValidate.length;
let brokenValue = arrayValidate.filter((brokeLinks) => {
  return brokeLinks.statusText == "fail";
})
    const elementStats = `
      Total: ${totalLinks}
      Unique: ${uniqueValue.length}`;
      const showBroken = `${elementStats}\n broken: ${brokenValue}`;
    
      if(showBroken) {
        console.log(showBroken)
        return showBroken
      } 
      else{
        return elementStats
      }
} 


module.exports.readDocument = readDocument;
module.exports.validateArrayLinks = validateArrayLinks;
module.exports.createArrayLinks= createArrayLinks;
