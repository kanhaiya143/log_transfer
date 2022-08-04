// Importing the required modules
const WebSocketServer = require('ws');
const fs = require('fs');
const TailingReadableStream = require('tailing-stream');
const stream = TailingReadableStream.createReadStream("./server_log.txt", {timeout: 0});

// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })

// Creating connection using websocket
wss.on("connection", ws => {
    console.log("new client connected");
    stream.on('data', buffer => {
        //console.log(buffer.toString());
        ws.send(buffer.toString());
      });

    stream.on('close', () => {
        console.log("close");
      });
      
    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`)
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");
