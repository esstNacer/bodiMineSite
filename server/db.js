// ES module export
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

let pool;

// ✅ Si DATABASE_URL est défini (prod Render)
if (process.env.DATABASE_URL) {
  
  const regex = /^mysql:\/\/(.*?):(.*?)@(.*?):(.*?)\/(.*?)$/;
  const match = process.env.DATABASE_URL.match(regex);

  if (!match) {
    throw new Error('Invalid DATABASE_URL format');
  }

  const [, user, password, host, port, database] = match;

  pool = mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
} else {console.log("on m'a pas appeler")
  // ✅ Sinon (dev local)
  pool = mysql.createPool({
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT || 3306,
    user:     process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

export default pool;
