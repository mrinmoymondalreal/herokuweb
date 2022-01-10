// var json = {
// 	user_id: "dhhdgsdsfjd",
// 	str: {
// 		"str": ["main_url", "str_id"],
// 		"str1": ["main_url", "str_id"],
// 		"str2": ["main_url", "str_id"]
// 	},
// 	linktree: ['url1','url2','urln']
// }

// for(var f in json.str){
// 	console.log(json.str[f][0]);
// }


const conn = require('./conn_files/conn')
const user = require('./model/user')
const str = require('./model/str')
const str_data = require('./model/str_user_data')

async function d1(){
var user_d = await user.find({__v:0})
	for(var i = 0;i < user_d.length;i++){
		await user.deleteOne({ _id: user_d[i]._id })
	}
}

d1();
