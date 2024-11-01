import { onEnd } from "./onEnd.js";
import { onError } from "./onError.js";
import { onData } from "./onData.js";

export const onConnection = (socket) => {
  console.log(`연결성공 ${socket.remoteAddress},${socket.remotePort}`);

  socket.buffer = Buffer.alloc(0); // 클라이언트가 연결되고 넘어오는 데이터들을 socket.buffer에 저장함
  // socket.buffer로 써주는 이유는 socket은 객체이고 새로운 키값을 넣어서 저장하면 용이하기 때문 현재 value는 새로운 버퍼공간

  socket.on("data", (data) => onData(socket)(data));
  socket.on("end", onEnd(socket));
  socket.on("error", (err) => onError(socket, err));
};
