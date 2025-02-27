(() => {
    const WEBSOCKET_PORT = 6969;
    let wsServer;

    function startWebSocketServer() {
        if (wsServer) {
            console.warn("WebSocket server already running.");
            return;
        }

        wsServer = new WebSocket(`ws://127.0.0.1:${WEBSOCKET_PORT}`);

        wsServer.onopen = () => {
            console.log(`[VesktopWS] WebSocket connected on port ${WEBSOCKET_PORT}`);
        };

        wsServer.onmessage = (event) => {
            const msg = event.data.trim();
            console.log(`[VesktopWS] Received message: ${msg}`);

            if (msg === "toggle_mute") {
                console.log("[VesktopWS] Toggling mute...");
                const muteButton = document.querySelector('[aria-label="Mute"]');
                if (muteButton) {
                    muteButton.click();
                    console.log("[VesktopWS] Mute button clicked.");
                } else {
                    console.warn("[VesktopWS] Mute button not found!");
                }
            }
        };

        wsServer.onclose = () => {
            console.warn("[VesktopWS] WebSocket closed.");
            wsServer = null;
        };

        wsServer.onerror = (error) => {
            console.error("[VesktopWS] WebSocket error:", error);
        };
    }

    function stopWebSocketServer() {
        if (wsServer) {
            console.log("[VesktopWS] Closing WebSocket server...");
            wsServer.close();
            wsServer = null;
        } else {
            console.warn("[VesktopWS] No WebSocket server to stop.");
        }
    }
    
    window.startVesktopWS = startWebSocketServer;
    window.stopVesktopWS = stopWebSocketServer;

    console.log("[VesktopWS] WebSocket control functions loaded.");
    console.log("Run `startVesktopWS()` to start and `stopVesktopWS()` to stop.");
})();