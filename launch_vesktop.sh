#!/bin/bash

#pkill -f vesktop

vesktop --remote-debugging-port=9222 &

echo "Waiting for vesktop to start..."
sleep 5

echo "Injecting keybind agent..."

cd ~/github/vencord-keybinds/js && bun run index.ts
