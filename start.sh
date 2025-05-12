#!/bin/sh

# Start Next.js
npm run start &

# Wait a bit for Next.js to start
sleep 5

# Start Nginx and keep it in the foreground
nginx -g 'daemon off;'
