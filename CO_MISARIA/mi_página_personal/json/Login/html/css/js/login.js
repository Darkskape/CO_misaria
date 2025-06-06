let intentos = 3;

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Login incorrecto');
    }
    return res.json();
  })
  .then(data => {
    alert(`Hola, ${data.nombre}`);
    sessionStorage.setItem('userId', data.id);
    if (data.cargo.toLowerCase() === 'agente') {
      window.location.href = 'mipagina_ag.html';
    } else {
      window.location.href = 'mipagina_ai.html';
    }
  })
  .catch(err => {
    intentos--;
    const mensaje = document.getElementById('mensaje');
    if (intentos > 0) {
      mensaje.innerHTML = `Error de login, prueba de nuevo<br>Intentos restantes: ${intentos}`;
    } else {
      mensaje.innerHTML = `Número máximo de intentos realizados, ponte en contacto con un supervisor`;
    }
  });
}
