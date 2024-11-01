// 핸들러 관리하는 곳

import { HANDLER_IDS } from "../constants/handlerIds.js";
import locationUpdateHandler from "./game/locationUpdate.handler.js";
import initialHandler from "./user/initial.handler.js";

const handlers = {
  [HANDLER_IDS.INITIAL]: {
    handler: initialHandler,
    protoType: "initial.InitialPayload",
  },
  [HANDLER_IDS.LOCATION_UPDATE]: {
    handler: locationUpdateHandler,
    protoType: "locationUpdatePayload.locationUpdatePayload",
  },
};

export const getHandlerByID = (handlerId) => {
  if (!handlers[handlerId]) {
    throw Error();
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw Error();
  }
  return handlers[handlerId].protoType;
};
