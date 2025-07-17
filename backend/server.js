import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ❌ Conexión vulnerable (sin prepared statements)
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT)
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const conn = await pool.getConnection();

    // ❌ Vulnerabilidad de inyección SQL
    const query = `SELECT * FROM usuarios WHERE usuario = '${username}' AND clave = '${password}'`;
    const rows = await conn.query(query);
    conn.release();

    if (rows.length > 0) {
      const user = rows[0];
      res.json({
        success: true,
        user: {
          usuario: user.usuario,
          direccion: user.direccion,
          monto: user.monto,
          tarjeta_credito: user.tarjeta_credito
        }
      });
    } else {
      res.json({ success: false, message: 'Usuario o clave incorrecta' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
