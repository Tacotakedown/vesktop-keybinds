use futures_util::{SinkExt, StreamExt};
use std::net::SocketAddr;
use tokio::net::TcpListener;
use tokio::sync::broadcast;
use tokio_tungstenite::accept_async;
use tokio_tungstenite::tungstenite::Message;

#[tokio::main]
async fn main() {
    let addr = "127.0.0.1:6969";
    let listener = TcpListener::bind(addr)
        .await
        .expect("Failed to bind WebSocket server");

    let (tx, _rx) = broadcast::channel::<String>(10);
    println!("WebSocket server running on ws://{}", addr);

    while let Ok((stream, _)) = listener.accept().await {
        let tx = tx.clone();
        let mut rx = tx.subscribe();

        tokio::spawn(async move {
            let ws_stream = accept_async(stream).await;
            if let Ok(ws) = ws_stream {
                println!("New WebSocket connection!");

                let (mut ws_sender, mut ws_receiver) = ws.split();

                let reader = tokio::spawn(async move {
                    while let Some(Ok(msg)) = ws_receiver.next().await {
                        println!("Received: {:?}", msg);
                        if let Ok(text) = msg.to_text() {
                            let _ = tx.send(text.to_string());
                        }
                    }
                });

                let writer = tokio::spawn(async move {
                    while let Ok(msg) = rx.recv().await {
                        let _ = ws_sender.send(Message::Text(msg)).await;
                    }
                });

                let _ = tokio::join!(reader, writer);
            }
        });
    }
}
