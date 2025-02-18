import mysql from "mysql2/promise";
import { formatDate } from "../utils/response/dataFormatter.js";

import { config } from "../config/config.js";

// 데이터베이스 커넥션 풀 생성 함수
const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    waitForConnections: true,
    connectionLimit: 10, // 커넥션 풀에서 최대 연결 수
    queueLimit: 0, // 0일 경우 무제한 대기열
  });

  const originalQuery = pool.query;

  pool.query = (sql, params) => {
    const date = new Date();
    // 쿼리 실행시 로그
    console.log(
      `[${formatDate(date)}] Executing query: ${sql} ${
        params ? `, ${JSON.stringify(params)}` : ``
      }`
    );
    return originalQuery.call(pool, sql, params);
  };

  return pool;
};

// 데이터베이스 커넥션 풀 생성
const dbpool = createPool();

export default dbpool;
