app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send('Logout realizado');
});

// Ruta para fechas de renovación
app.get('/api/fechas-renovacion', (req, res) => {
  const userId = req.query.userId;
  db.query('SELECT fecha_armas, fecha_coche, fecha_moto FROM renovaciones WHERE user_id = ?', [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('No encontrado');
    res.json(results[0]);
  });
});