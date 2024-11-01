// 중앙 집중식 관리
import dotenv from "dotenv";
//dotenv를 사용하려면 .env파일이 필요함

dotenv.config();
//.env에서 있는 내용을 불러와 process.env에 매칭시킴
// process.env는 객체이므로
// {
//   PORT: "3000",
//   HOST: "127.0.0.1",
//   CLIENT_VERSION: "1.0.0",
//   // 시스템의 다른 환경 변수들 (NODE_ENV, PATH 등)도 포함됨
// }와 같은 값이 들고와짐

export const PORT = process.env.PORT || "3306";
export const HOST = process.env.HOST || "localhost";
export const CLIENT_VERSION = process.env.CLIENT_VERSION || "1.0.0";

export const DB_NAME = process.env.DB_NAME || "user_db";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "qwe123";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = process.env.DB_PORT || "3306";
