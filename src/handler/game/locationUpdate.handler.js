import { getGameSession } from "../../sessions/game.session.js";

const locationUpdateHandler = ({ socket, userId, payload }) => {
  try {
    const { x, y } = payload;
    const gameSession = getGameSession();

    if (!gameSession) {
      console.error("게임 세션을 못찾았어요");
    }

    const user = gameSession.getUser(userId);
    if (!user) {
      console.error("유저를 못찾겠어요");
    }

    user.updatePosition(x, y);

    const locationData = gameSession.getAllLocation(userId);
    socket.write(locationData);
  } catch (e) {
    console.error(e);
  }
};

export default locationUpdateHandler;
