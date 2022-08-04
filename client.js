// client.js
const WebSocket = require('ws')
const fs = require('fs');

const url = 'ws://localhost:8080'
const connection = new WebSocket(url)
connection.onopen = () => {
  connection.send('Message From Client') 
}
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
connection.onmessage = (e) => {
  //console.log(e.data)
  fs.appendFile('./client_log.txt', e.data, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
}