import { toCamelCase } from "../../utils/transformCase.js";
import dbpool from "../database.js";
import { USER_QUERIES } from "./user.queries.js";

export const findUserByDeviceId = async (deviceId) => {
  const [row] = await dbpool.query(
    USER_QUERIES.FIND_USER_BY_DEVICE_ID,
    deviceId
  );
  return toCamelCase(row[0]);
};

export const creatUser = async (deviceid) => {
  await dbpool.query(USER_QUERIES.CREATE_USER, deviceid);
  return { deviceid };
};

export const updateUserLogin = async (deviceId) => {
  await dbpool.query(USER_QUERIES.UPDATE_USER_LOGIN, deviceId);
};

export const updateUserLocation = async (x, y, deviceId) => {
  await dbpool.query(USER_QUERIES.UPDATE_USER_LOCATION, [x, y, deviceId]);
};
