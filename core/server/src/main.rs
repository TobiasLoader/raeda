use jsonrpc_core::*;
use jsonrpc_http_server::*;

fn main() {
    let mut io = IoHandler::new();
    io.add_method("say_hello", |_params: Params| async {
        Ok(Value::String("hello".to_owned()))
    });

    let _server = ServerBuilder::new(io)
    .start_http(&"127.0.0.1:3030".parse().unwrap())
    .expect("Unable to start RPC server");

    _server.wait();
}