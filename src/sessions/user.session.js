import User from "../classes/models/user.class.js";
import { updateUserLocation } from "../db/user/user.db.js";
import { userSessions } from "./sessions.js";

export const addUser = (user) => {
  userSessions.push(user);
  return user;
};

export const removeUser = async (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index != -1) {
    // 일치하는 사용자가 없으면 -1을 리턴함
    const user = userSessions[index];
    await updateUserLocation(user.x, user.y, user.id);
    return userSessions.splice(index, 1)[0]; //splice는 배열로 반환하니까 [0]을 붙여서 배열에 첫번째 요소를 삭제!
  }
};

export const getAllUser = () => {
  return userSessions;
};
