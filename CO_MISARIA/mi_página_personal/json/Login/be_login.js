const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
  secret: 'clave_secreta',
  resave: false,
  saveUninitialized: true
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tubasededatos'
});

/*ruta*/

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT id, nombre, cargo FROM usuarios WHERE usuario = ? AND contraseña = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).send('Error en el servidor');
    if (results.length === 0) return res.status(401).send('Credenciales incorrectas');

    const user = results[0];
    req.session.userId = user.id;
    req.session.nombre = user.nombre;
    req.session.cargo = user.cargo;

    res.json({ nombre: user.nombre, cargo: user.cargo });
  });
});