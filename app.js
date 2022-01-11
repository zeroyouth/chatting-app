const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
const server = http.createServer(app);
const socketIO = require("socket.io")
const io = socketIO(server); // 변수에 server 담기
const moment = require("moment")

app.use(express.static(path.join(__dirname, "src")))// console.log(__dirname) // C:\Users\choi4\chat 가리킴
const PORT = process.env.PORT || 5000;

io.on("connection", (socket)=>{
    socket.on("chatting", (data) => {
        const { name,msg } = data;

        io.emit("chatting", {
            name,
            msg,
            time: moment(new Date()).format("h:ss A")
        })// 서버에서 클라에게 되돌려주기, 즉 보내주는 내용이 되겠음.
    })//받아줄 서버 준비
})

server.listen(PORT, ()=>console.log(`server is running ${PORT}`))