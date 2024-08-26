import postgres from 'postgres';

let sql: ReturnType<typeof postgres> | null = null;

export function getDb() {
  if (!sql) {
    const connectionString = process.env.POSTGRES_URL || '';
    sql = postgres(connectionString, {
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 10, // 连接池最大连接数
      idle_timeout: 20, // 空闲连接超时时间（秒）
    });
  }
  return sql;
}