use rocket::serde::json::{Json};
use rocket::serde::{Serialize, Deserialize};

// import services module
use crate::services;

// create a struct to hold our Date data
// need serialize/deserialize to convert to/from JSON
#[derive(Debug, Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct MsgReq {
    from: String,
    to: String
}

#[derive(Debug, Deserialize, Serialize)]
#[serde(crate = "rocket::serde")]
pub struct Msg {
	pub from: String,
	pub to: String,
	pub msg: String
}

// #[derive(Debug, Deserialize, Serialize)]
// #[serde(crate = "rocket::serde")]
// pub struct MsgHistory {
// 	history: <Vec<msg_handling::Msg>>
// }

#[post("/api/messages")]
pub fn get_messages() -> Json<Msg> {
	Json(services::msg_handling::get_messages())
}

#[post("/api/message", format = "json", data = "<params>")]
pub fn post_message(params: Json<Msg>) -> Json<Msg> {
	Json(services::msg_handling::post_message(params))
}