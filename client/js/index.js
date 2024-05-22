const sid=document.getElementById("socket-id");
const recepient=document.getElementById("receiver");
const uname=document.getElementById("username");
const message=document.getElementById("message");
const sendBtn=document.getElementById("send-btn");
const startChatBtn=document.getElementById("start-chat");
const msgsBox=document.getElementById("msgs-box");
const usernameBox=document.getElementById("username-box")
const chatBox=document.getElementById("chat-box");
const onlineList=document.getElementById("online-list");
var tone = new Audio('tone/incoming-message.mp3');
tone.volume=0.5;


let username=""

startChatBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    username=uname.value;
    uname.value="";
    setUsername(username);
})

sendBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const rec=recepient.value;
    const msg=message.value;
    message.value="";
    if(rec!=username){
        const obj={rec,"data":{"sender":username,"msg":msg}};
        sendMessage(obj);
    }
    selfSendMessage(rec,msg);
})


function updateReceiver(receivers){
    let optionsHtml="";
    let listHtml="";
    receivers.forEach(each => {
        optionsHtml+=`<option value="${each}">${each}</option>`;
        listHtml+=`<li>${each}</li>`;
    });
    recepient.innerHTML=optionsHtml;
    onlineList.innerHTML=listHtml;
}

function selfSendMessage(receiver,msg){
    const messageHtml=`<div class="each-message"><h3>You To : <span class="socket-id">${receiver}</span></h3><p>${msg}</p></div>`;
    msgsBox.innerHTML=messageHtml+msgsBox.innerHTML;
}

function updateMessages({sender,msg}){
    tone.play();
    const messageHtml=`<div class="each-message"><h3>USER: <span class="socket-id">${sender}</span></h3><p>${msg}</p></div>`;
    msgsBox.innerHTML=messageHtml+msgsBox.innerHTML;
}

function setBox(isUsernameSet){
    if(isUsernameSet){
        sid.innerText=username;
        usernameBox.style.display="none";
        chatBox.style.display="block";
    }
    else
    alert("Username is already taken! Try any new Username");
}