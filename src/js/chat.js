"use strict"

// const { relativeTimeThreshold } = require("moment");

 //오류 줄이기
const socket = io(); //클라이언트 소켓이 담기게 됨

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress", (event) => {
    if(event.keyCode === 13) { //엔터일때 실행
        send()
    }
})

function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param) //채널이름
}

sendButton.addEventListener("click", send)

socket.on("chatting", (data)=>{ //여기 안에 서버에서 말한거 담김
     //화면 그려주기 
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time); //초기화시켜줌, 인스턴스화
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})//서버에서 말하는거 받아줄때

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom = `<span class="profile">
                        <span class="user">${this.name}</span>
                        <img class="img" src="http://placeimg.com/50/50/any" alt="any">
                        </span>
                    <span class="message">${this.msg}</span>
                    <span class="time">${this.time}</span>`;
        li.innerHTML = dom;
        chatList.appendChild(li);
    }
}

