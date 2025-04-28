import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { parse } from 'pg-connection-string';
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

// On parse l'url de connexion
const { host, port, database, user, password } = parse(dbUrl);

// Créer la connexion pool
const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
