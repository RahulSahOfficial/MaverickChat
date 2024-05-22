import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';

const port=3000;
let sockets={};

const app=express();
const server=createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://rahulsahofficial.github.io",
        methods:["GET","POST"]
    },
});


io.on("connection",(socket)=>{
    // console.log(`New Client Joined ${socket.id}`);
    socket.on("send-message",(data)=>{
        // console.log(data);
        io.to(sockets[data.rec]).emit("new-message",data.data);
    });
    socket.on("check-username",(uname)=>{
        if(sockets[uname]==undefined){
            sockets[uname]=socket.id;
            // console.log(sockets)
            socket.emit("username-response",true);
            io.emit("add-socket",(Object.keys(sockets)))
        }
        else
            socket.emit("username-response",false);
    })
    socket.on("disconnect", () => {
        for(var s in sockets) {
            if(sockets[s] == socket.id) {
                delete sockets[s];
                break;
            }
        }
        // console.log(`disconnect ${socket.id}`);
        io.emit("add-socket",(Object.keys(sockets)))
    });
})



server.listen(port,()=>{
    console.log(`Server is running of port ${port}`)
})
