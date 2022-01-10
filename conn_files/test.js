const conn = require("./conn")
const myModel = require('../model/str');

async function createIndex(){
    const re = await myModel.index({str: 1});
    console.log(re);
}

createIndex();