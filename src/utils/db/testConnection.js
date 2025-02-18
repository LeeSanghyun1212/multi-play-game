import dbPool from "../../db/database.js";

export const testDbConnection = async (pool) => {
  try {
    const [rows] = await dbPool.query("SELECT 1 + 1 AS solution");
    console.log(`테스트 쿼리 결과: ${rows[0].solution}`);
  } catch (e) {
    console.log(e);
    console.error(`테스트 쿼리 실행 중 오류 발생: ${e}`);
  }
};
