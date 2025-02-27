use futures_util::sink::SinkExt;
use tokio_tungstenite::connect_async;
use url::Url;

#[tokio::main]
async fn main() {
    let url = Url::parse("ws://127.0.0.1:6969").expect("Invalid WebSocket URL");

    match connect_async(url).await {
        Ok((mut ws_stream, _)) => {
            println!("Connected to WebSocket server");
            ws_stream
                .send("toggle_mute".into())
                .await
                .expect("Failed to send message");
            println!("Message sent: toggle_mute");
        }
        Err(e) => eprintln!("Failed to connect: {}", e),
    }
}
