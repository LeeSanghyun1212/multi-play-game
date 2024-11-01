class User {
  constructor(socket, id, plyaerid, latency, coords) {
    this.id = id;
    this.socket = socket;
    this.plyaerid = plyaerid;
    this.latency = latency;
    this.x = coords.x;
    this.y = coords.y;

    this.lastUpdateTime = Date.now();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }
}

export default User;
