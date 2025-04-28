import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// On récupère directement l'URL Railway (mysql://root:password@host:port/railway)
const dbUrl = process.env.DATABASE_URL;

// On analyse l'URL pour extraire les infos
const regex = /^mysql:\/\/(.*?):(.*?)@(.*?):(.*?)\/(.*?)$/;
const match = dbUrl.match(regex);

if (!match) {
  throw new Error('Invalid DATABASE_URL format');
}

const [, user, password, host, port, database] = match;

// Créer le pool MySQL
const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
