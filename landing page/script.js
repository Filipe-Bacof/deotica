document.getElementById('formContato').addEventListener('submit', function(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;

  fetch('https://deotica-api.vercel.app/promoEmail', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome: nome, email: email })
  })
  .then(response => response.json())
  .then(data => alert("Cadastro realizado com sucesso!"))
  .catch(error => console.error('Erro:', error));
});
