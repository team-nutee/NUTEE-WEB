const SocketIO = require('socket.io');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const cookie = require('cookie-signature');

module.exports = (server,app,sessionMiddleware)=>{
    const io = SocketIO(server,{path:'/socket.io'});
    app.set('io',io);  // express 에서의 변수 저장 방법입니다. 변수 라우터에서도 쓸 예정입니다.
    // req.app.get('io').of('/room').emit

    const room = io.of('/room'); // room 네임스페이스에서는 방 목록에 관해서만 데이터를 받아옵니다.
    const chat = io.of('/chat'); // chat 네임스페이스는 채팅 올라오고 사용자 채팅방 입장/퇴장에 대해서 받을 것입니다.

    // Socket.io 에서의 미들웨어 생성입니다.
    // 아래 코드는 express 미들웨어를 Socket.io 에서 사용하는 코드입니다.
    io.use((socket,next)=>{
        cookieParser(process.env.COOKIE_SECRET)(socket.request, socket.request.res, next);
    });
    io.use((socket,next)=>{ // WebSocket 에서는 req,res 인자 대신 socket, next 인자만 존재합니다.
        sessionMiddleware(socket.request, socket.res, next);
    });

    room.on('connection',(socket)=>{
        console.log('room 네임스페이스 접속');
        socket.on('disconnect',()=>{
            console.log('room 네임스페이스 접속 해제');
        });
    });

    chat.on('connection',(socket)=>{
        console.log('chat 네임스페이스 접속');
        const req = socket.request;
        const { headers: { referer }} = req;
        const roomId = referer // 방 제목을 받아오는 코드입니다.
            .split('/')[referer.split('/').length-1] // req.headers.referer 에 웹 주소가 들어있는데, 거기서 방 아이디를 가져옵니다.
            .replace(/\?.+/,'');

        socket.join(roomId); // 채팅방 입장
        axios.post(`http://localhost:9425/room/${roomId}/sys`,{
            type:'join',
        },{
            headers:{
                Cookie:`connect.sid = ${'s%3A'+ cookie.sign(req.signedCookies['connect.sid'], process.env.COOKIE_SECRET)}`, // connect.sid 는 암호화된 쿠키입니다.
            }
        });
        // cookie.sign + 쿠키 내용 + 암호화 키로 암호화 쿠키를 만듭니다.
        // connect.sid 는 express.session의 세션 쿠키입니다. (개발자도구의 application의 connect.sid)
        // 이거 남아있는 한 세션 계속 유지됩니다. 이 값 바뀌면 다른사람으로 취급됩니다.
        // 서버는 항상 요청을 받았을 때 쿠키를 검사합니다. 쿠키를 검사해서 만약 이 connect.sid가 같으면 같은사람으로, 다르면 다른 사람으로 인식합니다.
        socket.on('disconnect',()=>{
            console.log('네임스페이스 접속 해제');
            socket.leave(roomId); // 채팅방 퇴장
            // 방에 인원이 없을 시 자동으로 방을 폭파시킵니다.


            const currentRoom = socket.adapter.rooms[roomId];  // socket.adapter.rooms[방아이디]에 방 정보와 인원이 들어있습니다.
            const userCount = currentRoom ? currentRoom.length : 0;
            console.log(`현재 ${roomid} 방에 ${userCount}명 남아있습니다.`);
            if(userCount === 0 ){ // 방에 남아있는 사람이 없으면
                axios.delete(`http://localhost:9425/room/${roomId}`)
                    .then(()=>{
                        console.log('방 제거 요청 성공');
                    })
                    .catch((error)=>{
                        console.error(error);
                    });
            }else{
                axios.post(`http://localhost:9425/room/${roomId}/sys`,{
                    type:'exit',
                },{
                    headers:{
                        Cookie: `connect.sid = ${'s%3A'+ cookie.sign(req.signedCookies['connect.sid'], process.env.COOKIE_SECRET)}`,
                    }
                })
            }
        });
        socket.on('dm',(data)=>{
            console.log('귓속말 전송됨');
            socket.to(data.target).emit('dm',data);
        });

        socket.on('ban',(data)=>{
            socket.to(data.io).emit('ban');
        });

    });
};
/*
socket.join(방 아이디)   입장
socket.to(방 아이디).emit()   특정 방으로 메시지 전송
socket.leave(방 아이디)     퇴장
위 세 가지는 socket.io에서 이미 다 구현해놓음.
 */