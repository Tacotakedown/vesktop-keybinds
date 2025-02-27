## Vesktop Keybinds

keybinds... for Vesktop... uh pretty self explanatory.

### How it works

Since vesktop doesn't natively support keybinds, we will do some tomfoolery to get it to work. Fist, we will create a
websocket server that handles the input and passing it into the listener. The listener is injected into electron
and handles the action in the app.
The sender, in this case, is just a simple executable that sends the mute command upon execution.

### How to use

1. Clone the repo and build all rust binaries
2. Create a systemd service for the websocket server
3. Launch vesktop using the provided `launch_vesktop.sh` script **Note that the path to the repo must be correct**
4. Use the keybind sender as the keybind action (i.e. in hyprland `bind <key> exec /path/to/sender`)