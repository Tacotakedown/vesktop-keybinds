import puppeteer from "puppeteer-core";

async function injectScript() {
    try {
        console.log("🔗 Connecting to Vesktop...");
        const browser = await puppeteer.connect({
            browserURL: "http://127.0.0.1:9222",
            defaultViewport: null,
        });

        const pages = await browser.pages();
        const vesktopPage = pages.find((page) => page.url().includes("discord"));

        if (!vesktopPage) {
            console.error("❌ Vesktop page not found!");
            return;
        }

        console.log("🚀 Injecting WebSocket script...");
        await vesktopPage.evaluate(() => {
            const WEBSOCKET_PORT = 6969;
            let wsServer = new WebSocket(`ws://127.0.0.1:${WEBSOCKET_PORT}`);

            wsServer.onmessage = (event) => {
                if (event.data.trim() === "toggle_mute") {
                    (document.querySelector('[aria-label="Mute"]') as HTMLElement)?.click();
                }
            };

            console.log("[VesktopWS] Script injected!");
        });

        console.log("✅ WebSocket script successfully injected!");
    } catch (err) {
        console.error("❌ Failed to connect:", (err as Error).message);
    }
}

injectScript();