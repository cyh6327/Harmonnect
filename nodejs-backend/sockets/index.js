module.exports = (io) => {
    // 클라이언트가 연결되었을 때 실행되는 함수
    io.on('connection', (socket) => {
      console.log('New client connected');

      // 클라이언트로 메시지 보내기 예시
      socket.emit('message', '안녕하세요! 클라이언트님.');
  
      // 클라이언트로부터 메시지를 받았을 때 실행되는 함수
      socket.on('message', (msg) => {
        console.log('Received message:', msg);
        // 다른 클라이언트에게 메시지를 전달합니다.
        io.emit('message', msg);
      });
  
      // 클라이언트가 연결을 끊었을 때 실행되는 함수
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  };
  