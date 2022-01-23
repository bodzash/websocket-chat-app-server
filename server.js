const WebSocket = require("ws")
const serverPort = 5000

const wss = new WebSocket.Server({ port: serverPort }) //port: serverPort

console.log("Server initiated and running on PORT: "+serverPort)

wss.on("connection", function(ws) {
    console.log("Socket connected")
    broadcast(ws,"Somebody has joined the chat")

    ws.on("message",function(packet) {
        broadcast(ws, packet)
        console.log("Message from "+parse(String(packet))[0]+": "+parse(String(packet))[1])
    })

    ws.on("close", function() {
        broadcast(ws,"Somebody has left the chat")
        console.log("Socket left")
    })

    ws.on("error", function(err) {
        console.log("Error: "+err)
    })
})

function broadcast(ws, packet) {
    wss.clients.forEach(function each(client) {
        if (client != ws) {
            client.send(String(packet))
        }
    })
}

function parse(arg) {
    return arg.split(",")
}