export const USER_QUERIES = {
  FIND_USER_BY_DEVICE_ID: "SELECT * FROM user WHERE device_id = ?",
  CREATE_USER: "INSERT INTO user (device_id) VALUES (?)",
  UPDATE_USER_LOGIN:
    "UPDATE user SET last_login = CURRENT_TIMESTAMP WHERE device_id = ?",
  UPDATE_USER_LOCATION:
    "UPDATE user SET x_coord = ?, y_coord =? WHERE device_id = ?",
};

// 이전에 dbpool을 만들어뒀으니 dbpool은 querie를 실행하므로 내가 실행하고싶은 querie문을 작성한 후 user.db.js에서 사용!
