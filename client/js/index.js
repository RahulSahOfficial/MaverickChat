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
    const obj={rec,"data":{"sender":username,"msg":msg}};
    sendMessage(obj);
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


function updateMessages({sender,msg}){
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