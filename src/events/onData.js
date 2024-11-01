import {
  TOTAL_LENGTH,
  PACKET_TYPE_LENGTH,
  PACKET_TYPE,
} from "../constants/header.js";
import { getHandlerByID } from "../handler/index.js";
import { packetParser } from "../utils/parser/packetParser.js";

export const onData = (socket) => (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);
  const totalHeaderLength = TOTAL_LENGTH + PACKET_TYPE_LENGTH; // 총 헤더 길이는 5

  while (socket.buffer.length > totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(TOTAL_LENGTH);
    if (socket.buffer.length >= length) {
      const packet = socket.buffer.subarray(totalHeaderLength, length);
      socket.buffer = socket.buffer.subarray(length);
      try {
        switch (packetType) {
          case PACKET_TYPE.NORMAL: {
            const { handlerId, userId, payload } = packetParser(packet);
            const handler = getHandlerByID(handlerId);

            handler({ socket, userId, payload });
          }
        }
      } catch (err) {
        console.error("데이터 전달 오류", err);
      }
    } else {
      break;
    }
  }
};
