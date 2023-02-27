use rocket::serde::json::{Json};
// use crate::routes::msg_handling::MsgReq;
use crate::routes::msg_handling::Msg;
// use crate::routes::msg_handling::MsgHistory;

pub fn get_messages() -> Msg {
	// get messages
	//{vec!([Msg {"a","b","msg"}])}
	println!("message {:?}",Msg {from:"a".to_string(),to:"b".to_string(),msg:"msg".to_string()});
	Msg {from:"a".to_string(),to:"b".to_string(),msg:"msg".to_string()}
}

pub fn post_message(params:Json<Msg>) -> Msg {
	// get messages
	//{vec!([Msg {"a","b","msg"}])}
	println!("message {:?}",params);
	Msg {from:params.from.clone(),to:params.to.clone(),msg:params.msg.clone()}
}