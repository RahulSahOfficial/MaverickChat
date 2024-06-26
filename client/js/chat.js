// const socket = io("http://localhost:3000");
const socket = io("https://maverickchat.onrender.com/");

function setUsername(uname){
    socket.emit("check-username",uname);
}

function sendMessage(obj){
    socket.emit("send-message",obj);
}

socket.on("username-response",(isUsernameSet)=>{
    setBox(isUsernameSet)
})

socket.on("add-socket",(receivers)=>{
    updateReceiver(receivers,socket.id);
})

socket.on("new-message",(data)=>{
    updateMessages(data);  
})
