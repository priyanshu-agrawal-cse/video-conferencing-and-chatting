import { Server, Socket } from "socket.io"

let connections = {}
let messages = {}
let timeOnLine = {}



export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "https://video-conferencing-and-chatting-webapp.onrender.com",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });

    io.on("connection", (Socket) => {
        console.log("connected to something")
        Socket.on("join-call", (path) => {
            if (connections[path] == undefined) {
                connections[path] = [];
            }
            connections[path].push(Socket.id)
            timeOnLine[Socket.id] = new Date();

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", Socket.id, connections[path])
            }

            if (messages[path] != undefined) {
                for (let a = 0; a < connections[path].length; a++) {
                    io.to(Socket.id).emit("chat-message", messages[path][a]['data'], messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }


        })

        Socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", Socket.id, message)
        })


        Socket.on("chat-message", (data, sender) => {
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomVal]) => {
                    if (!isFound && roomVal.includes(Socket.id)) {
                        return [roomKey, true];
                    }
                    return [room, isFound];
                }, ['', false]);

            if (found == true) {
                if (messages[matchingRoom] == undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, 'data': data, 'socket-id-sender': Socket.id })
                console.log(sender, data,  matchingRoom ,Socket.id);

                connections[matchingRoom].forEach((ele) => {
                    io.to(ele).emit("chat-message", data, sender, Socket.id)

                })


            }




        })

        Socket.on("disconnect", () => {

            var defftime = Math.abs(timeOnLine[Socket.id] - new Date());
            var key
            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                for (let a = 0; a < v.length; ++a) {
                    if (v[a] == Socket.id) {
                        key = k;
                        for (let a = 0; a < connections[key].length; a++) {
                            // io.connections[key][a].emit("user-left", Socket.id)
                            io.to(connections[key][a]).emit("user-left", Socket.id)
                        }

                        var index = connections[key].indexOf(Socket.id)
                        connections[key].slice(index, 1);
                        if (connections[key].length == 0) {
                            delete connections[key];
                        }
                    }

                }
            }

        })


    })


    return io;
}
