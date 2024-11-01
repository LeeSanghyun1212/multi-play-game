import { createLocationPacket } from "../../utils/notification/game.notification.js";

class Game {
  constructor(id) {
    // 호출당시 id를 받음
    this.id = id;
    this.users = []; //접속한 유저들을 받을 곳
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(userId) {
    return this.users.find((user) => user.id === userId);
  }

  removeUser(socket) {
    const index = this.users.findIndex((user) => user.socket === socket);
    if (index != -1) {
      // 일치하는 사용자가 없으면 -1을 리턴함
      return this.users.splice(index, 1)[0]; //splice는 배열로 반환하니까 [0]을 붙여서 배열에 첫번째 요소를 삭제!
    }
  }

  getAllLocation(userId) {
    // 모든 유저들에 대한 정보를 받아 접속한 유저에게 보내주는 것
    const locationData = this.users
      .filter((user) => user.id !== userId)
      .map((user) => {
        return { id: user.id, playerID: user.playerID, x: user.x, y: user.y };
      });
    return createLocationPacket(locationData);
  }
}

export default Game;
