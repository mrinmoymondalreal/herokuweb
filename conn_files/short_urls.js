const conn = require("./conn")
const myModel = require('../model/str');
const axios = require("axios");
const cheerio = require("cheerio");
const strModel = require("../model/str_user_data")
const { add_user, add_str, add_view } = require("./user_links")

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  return result;
}

async function scrapeData(url) {
  try {
    const { data } = await axios.get(url);
	var g = new URL(url);
	q = "https://play.google.com/store/search?q="+g.host+"&c=apps";
	const { data: google } = await axios.get(q);
    const $ = cheerio.load(data);
	
	var f = cheerio.load(google)('.Ktdaqe .wXUyZd a').attr('href').split("id=")[1],
		t = $('title').text();
	return {title: t, pck: f};
  } catch (err) {
	return {err: err};
  }
}

function setHttp(link) {
  if (link.search(/^(https|tcp|http|ftp)?\:\/\//) == -1) {
      link = 'https://' + link;
  }
  return link;
}
function isDef(e){
  return !(e == null  || e == undefined);
}

function checkUrl(l){
  var expression =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  return isDef(l.match(regex));
}


async function enter_data(main_url, str_size, isAppOpener, user_id){
  if(typeof main_url == 'string', typeof str_size == 'number', typeof isAppOpener == 'boolean'){
    const str = makeid(str_size);
    const response = await myModel.create({str,main_url,user_id,str_size,isAppOpener,url_title: "  ",package_name:"  "});
    setTimeout(async ()=>{
      var {title, pck} = await scrapeData(main_url);
      await pushData(response._id, title, pck);
      var f = await strModel.findOne({user_id: user_id});
      f.strs[str] = [main_url, response._id];
      await strModel.updateOne({_id: f._id},{$set:{strs:f.strs}});
    }, 0);
    if(response.__v==0){return {status: 200, data: {txt: "successfully entered", str: str, main_url: main_url}}; }
    return {status: 200, data: {txt:"Some error Occcured"}};

  }else{
    return {status: 406, data: "fields not valid"};
  }
}

async function pushData(_id, title, pck){
  await myModel.updateOne({_id:_id},{$set:{url_title: title,package_name: pck}});
}

async function UrlCon(main_url, str_size, isAppOpener, user_id){
  var exists = checkUrl(main_url);
  if(exists){
    var jj = setHttp(main_url);
    const js = await myModel.findOne({user_id: user_id, main_url: jj});
    if(isDef(js)){
      return {status: 200, data: {txt: "successfully entered", str: js.str, main_url: js.main_url}};
    }
    var f = await enter_data(jj, str_size, isAppOpener, user_id);
    return f;
  }else{
    return {status: 406, data: "URL is invalid"};
  }
}

async function find_link(sh_url){
  const records = await myModel.findOne({"str": sh_url});
  if(isDef(records)){
    
    return {status: 200, main_url: records.main_url, package_name: records.package_name, isAppOpener: records.isAppOpener, _id: records._id, str: sh_url};
  }else{
    return {status: 404, data:"No url find linked to this string"};
  }
}

async function find_link_with_id(_id){
  const records = await myModel.findOne({"str_id": _id});
  if(isDef(records)){
    
    return {status: 200, main_url: records.main_url, package_name: records.package_name, isAppOpener: records.isAppOpener, _id: records._id, str: records.str};
  }else{
    return {status: 404, data:"No url find linked to this string"};
  }
}
module.exports = {
  addUrl: UrlCon,
  findUrl: find_link,
  // addFind: add_and_find_url,
}