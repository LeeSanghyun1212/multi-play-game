import net from "net";
import { PORT, HOST } from "./constants/env.js";
import { onConnection } from "./events/onConnection.js";
import initServer from "./init/index.js";

const server = net.createServer(onConnection);
initServer()
  .then(() => {
    server.listen(PORT, HOST, () => {
      console.log(`${PORT}와${HOST}`);
      console.log(server.address());
    });
  })
  .catch((e) => {
    console.error(e);
  });
