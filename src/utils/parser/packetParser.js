import { CLIENT_VERSION } from "../../constants/env.js";
import { getProtoTypeNameByHandlerId } from "../../handler/index.js";
import { getProtoMessages } from "../../init/loadProto.js";

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();
  const Packet = protoMessages.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (error) {
    console.error(error);
  }
  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.version;

  if (clientVersion !== CLIENT_VERSION) {
    console.log("클라이언트 버전이 일치하지 않습니다.");
  }
  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw Error();
  }

  const [namespace, typeName] = protoTypeName.split(".");
  const payloadType = protoMessages[namespace][typeName];
  let payload;
  try {
    payload = payloadType.decode(packet.payload);
  } catch (e) {
    console.error(e);
  }

  const expectedFields = Object.keys(payloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter(
    (field) => !actualFields.includes(field)
  );
  if (missingFields.length > 0) {
    throw new CustomError(
      ErrorCodes.MISSING_FIELDS,
      `필수 필드가 누락되었습니다: ${missingFields.join(", ")}`
    );
  }

  return { handlerId, userId, payload };
};
