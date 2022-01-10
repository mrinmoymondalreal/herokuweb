// const conn = require("./conn")
// const myModel = require('../model/str_user_data');

// async function create_str_with_user(strs, strs_number, user_id){
//     try{
//         const h = await myModel.create({strs, strs_number, user_id});
//         return true;
//     }catch{
//         return false;
//     }
// }
// async function add_str_to_data_list(user_id, str, str_id){
//     const records = await myModel.findOne({user_id: user_id});
//     records.strs[str] = {
//         str_id: str_id,
//         str_total_visitor: 0,
//         str_visitor_depth: []
//     }
//     const results = await myModel.updateOne({_id:records._id},{$set:{strs: records.strs, strs_number: records.strs_number++}});
//     if(results.acknowledged) return {status: 200, data: "process done"};

//     return {status: 400, data: "error occured"};

// }
// async function find_str_with_user(user_id){
//     const result = await myModel.findOne({user_id: user_id});
//     const str_arr = result.strs;
//     for(var i = 0;i < str_arr.length;i++){
//         total_visitor += str_arr[i].str_total_visitor;
//     }
//     if(results) return {status: 200, data: "process done"};
//     return {status: 400, data: "error occured"};
// }
// async function addViewsToUserStr(user_id, str){
//     const records = await myModel.findOne({user_id: user_id});
//     records.strs[str].str_total_visitor++;
//     records.strs[str].str_visitor_depth.push(['gmail.com', '03-01-2022', 'IND']);
//     const results = await myModel.updateOne({_id:records._id},{$set:{strs: records.strs}});
//     console.log(results.acknowledged);
// }

// // create_str_with_user({"ll": "dummpy"}, 0, "lkslkkdkjdjdjdjdjd", "");

// // add_str_to_data_list("61c9c2927709e663e6d1bc20", "hzg", "61d2be62f19865f7fa7f");

// // find_str_with_user("61c9c2927709e663e6d1bc20");

// // addViewsToUserStr("61c9c2927709e663e6d1bc20", "hzYg");

// module.exports = {
//     add_user: create_str_with_user,
//     add_str: add_str_to_data_list,
//     add_view: addViewsToUserStr,
// }



