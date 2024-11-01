// gameAssets.js
import fs from "fs";
import path from "path";
import dbPool from "../database.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createSchema = async () => {
  const sqlDir = path.join(__dirname, "../sql");
  try {
    const sql = fs.readFileSync(sqlDir + "/user_db.sql", "utf8");

    const queries = sql
      .split(";")
      .map((query) => query.trim())
      .filter((query) => query.length > 0);

    for (const query of queries) {
      await dbPool.query(query);
    }
  } catch (e) {
    console.error(`데이터베이스 테이블 생성 중 오류 발생: ${e}`);
  }
};

createSchema()
  .then(() => {
    console.log("마이그레이션 완료");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
