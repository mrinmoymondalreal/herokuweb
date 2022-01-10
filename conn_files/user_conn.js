const conn = require("./conn")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const myModel = require('../model/user');
const strModel = require("../model/str_user_data")


function isDef(e){
    return !(e == null  || e == undefined);
}

async function checkUser(usr, pwd, JWT_SECRET){
    const records = await myModel.find({"username":usr});
    if(records.length == 1){
      if(await bcrypt.compare(pwd, records[0].password)){
        const token = jwt.sign(
          {
            id: records[0]._id,
            username: records[0].username
          },
          JWT_SECRET
        );
        return {status: "success", data: token};
      }else{
        return {status: "Failed", data: "Invaild Credentials"};
      }
    }else{
      const fakeHash = await bcrypt.compare(pwd, "hddgfdhgvdscbshvhdsvjdbfjdvchuxzxkBK$%##$E^EVBJDVDBH$%^#&FJV^&##HE");
      return {status: "Failed", data: "Invaild Credentials"};
    }
}

async function addUser(username, pwd, email, name, mob){
    const usrcheck = await myModel.findOne({"username":username});
    const records = await myModel.findOne({"email":email});
    if(isDef(records)){
        return {status: "failed", data: "email already exists"};
    }else{
        if(isDef(usrcheck)){
            return {status: "failed", data: "username unavailable"};
        }else{
            const password = await bcrypt.hash(pwd, 10);
            const response = await myModel.create({username,email,password,name,mob});
            setTimeout(async ()=>{
              const make = await strModel.create({
                strs: {'random': 'kdkdjk'},
                linktree: [],
                user_id: response._id
              });
            },0)
            if(response.__v == 0) return {status: "success", data: "please login now"};
            return {status: "failed", data: "Unknown Error Occured"};
        }
    }
}


module.exports = {
    checkUsr: checkUser,
    addUsr: addUser,
}