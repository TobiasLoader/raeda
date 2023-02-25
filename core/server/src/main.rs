#![feature(proc_macro_hygiene, decl_macro)]

// import Rocket
#[macro_use] extern crate rocket;
use rocket::response::Redirect;
mod routes;
mod services;

use routes::msg_handling::get_messages;
use routes::msg_handling::post_message;

#[get("/")]
fn raeda_link() -> Redirect {
    Redirect::to("https://www.raeda.link")
}

#[get("/api")]
fn api_info() -> Redirect {
    Redirect::to("https://www.raeda.link")
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![raeda_link, api_info, get_messages, post_message])
}





// #![feature(proc_macro_hygiene, decl_macro)]
// 
// #[macro_use] extern crate rocket;
// use rocket::response::Redirect;
// use rocket_contrib::json::Json;
// use serde::Deserialize;
// 
// mod routes;
// 
// #[get("/")]
// fn redirect() -> Redirect {
//     Redirect::to("https://www.raeda.link")
// }
// 
// #[derive(Debug, PartialEq, Eq, Deserialize)]
// struct MsgReq {
//     from: String,
//     to: String
// }
// 
// #[post("/", format = "json", data = "<msg_req>")]
// fn messages(msg_req: Json<MsgReq>) -> String {
//     format!("print test {:?}", msg_req)
// }
// 
// // #[post("/user", format = "application/json", data = "<from><to>")]
// // fn get_messages(from: String, to: String) -> String {
// //     format!("Message history from {} to {}", from, to)
// // }
// 
// fn main() {
//     rocket::ignite().mount("/messages", routes![routes::messages, routes::redirect]).launch();
// }
// 
// 
// 
// // use jsonrpc_core::*;
// // use jsonrpc_http_server::*;
// 
// // extern crate serde;
// // use serde::Serialize;
// // use serde::de::DeserializeOwned;
// // 
// // fn extract_params(params:Params,callback:&dyn Fn(Params) -> jsonrpc_core::Value) -> jsonrpc_core::Value {
// //     if let Params::Map(m) = params {
// //         // IF MAP – IE: AN OBJ FROM JS SERVER, DICT FROM PY SERVER...
// //         return callback(jsonrpc_core::Params::Map(m));
// //     } else if let Params::Array(a) = params {
// //         // IF ARRAY – SHOULD ALWAYS BE MAP ACCORDING TO API
// //         return callback(jsonrpc_core::Params::Array(a));
// //     } else {
// //         return jsonrpc_core::Value::Null;
// //     }
// // }
// // 
// // fn extract_params_verbose(params:Params,callback:&dyn Fn(Params) -> jsonrpc_core::Value) -> jsonrpc_core::Value {
// //     if let Params::Map(m) = params {
// //         // IF MAP – IE: AN OBJ FROM JS SERVER, DICT FROM PY SERVER...
// //         println!("Total {} elements: ", m.len());
// //         for k in m.keys() {
// //             println!("\t{} => {:?}", k, m.get(k));
// //         }
// //         return callback(jsonrpc_core::Params::Map(m));
// //     }
// //     if let Params::Array(a) = params {
// //         // IF ARRAY – SHOULD ALWAYS BE MAP ACCORDING TO API
// //         println!("Total {} elements: {:?}", a.len(), a);
// //         return callback(jsonrpc_core::Params::Array(a));
// //     }
// // }
// 
// // fn say_hello(m:Params) -> Value {
// //     let p1 = m.get("p1");
// //     let s = "hello " + p1;
// //     return Value::String(s.to_owned())
// // }
// 
// // pub struct Msg {
// //     pub from: String,
// //     pub to: String,
// //     pub msg: String,
// // }
// 
// // fn get_field_by_name<T, R>(data: T, field: &str) -> R
// // where
// //     T: Serialize,
// //     R: DeserializeOwned,
// // {
// //     let mut map = match serde_value::to_value(data) {
// //         Ok(Value::Map(map)) => map,
// //         _ => panic!("expected a struct"),
// //     };
// // 
// //     let key = Value::String(field.to_owned());
// //     let value = match map.remove(&key) {
// //         Some(value) => value,
// //         None => panic!("no such field"),
// //     };
// // 
// //     match R::deserialize(value) {
// //         Ok(r) => r,
// //         Err(_) => panic!("wrong type?"),
// //     }
// // }
// 
// // fn main() {
//     // let mut msg_his: Value::<Vec<Msg>> = vec![new(Msg {from:"0x02",to:"0x01",msg:"a msg"})];
//     // fn getMessageHistory(from:String,to:String) -> Value::<Vec<Msg>> {
//     //     let chat_msgs = Vec::from([]);
//     //     let mut parse_msgs = || {
//     //         let serialised = get_field_by_name(&msg,"to");
//     //         if serialised["from"]==from && serialised["to"]==to {
//     //             chat_msgs.push(msg);
//     //         }
//     //     };
//     //     parse_msgs();
//     //     chat_msgs
//     // }
// 
//     // let mut io = IoHandler::new();
//     // 
//     // io.add_method("message", |params: Params| async move {
//     //     let mut s: std::string::String = "incorrect parameters".to_string();
//     //     if let Params::Map(m) = params {
//     //         assert!(m.get("to").unwrap().is_string());
//     //         assert!(m.get("msg").unwrap().is_string());
//     //         // getMessageHistory(m.get("from").unwrap().is_string(),m.get("to").unwrap().is_string());
//     //         let option_to = m.get("to").unwrap().as_str();
//     //         let option_msg = m.get("msg").unwrap().as_str();
//     //         let mut new_s: std::string::String = "".to_string();
//     //         if option_to!=None {
//     //             new_s = format!("Basic MSG to {}: {}", &option_to.unwrap().to_owned(), &option_msg.unwrap().to_owned());
//     //         }
//     //         s = new_s;
//     //     }
//     //     Ok(Value::String(s.to_owned()))
//     // });
//     
//     // io.add_method("message", |params: Params| async move {
//     //     let mut s: std::string::String = "incorrect parameters".to_string();
//     //     if let Params::Map(m) = params {
//     //         assert!(m.get("to").unwrap().is_string());
//     //         assert!(m.get("msg").unwrap().is_string());
//     //         let option_to = m.get("to").unwrap().as_str();
//     //         let option_msg = m.get("msg").unwrap().as_str();
//     //         let mut new_s: std::string::String = "".to_string();
//     //         if option_to!=None {
//     //             new_s = format!("Basic MSG to {}: {}", &option_to.unwrap().to_owned(), &option_msg.unwrap().to_owned());
//     //         }
//     //         s = new_s;
//     //     }
//     //     Ok(Value::String(s.to_owned()))
//     // });
// // 
// //     let _server = ServerBuilder::new(io)
// //     .start_http(&"127.0.0.1:3030".parse().unwrap())
// //     .expect("Unable to start RPC server");
// // 
// //     _server.wait();
// // }