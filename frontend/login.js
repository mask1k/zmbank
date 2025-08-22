const botaoEntrar = document.querySelector('.botao-entrar');
const inputEmail = document.querySelector('.email');
const inputSenha = document.querySelector('.password');

botaoEntrar.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = inputEmail.value;
  const senha = inputSenha.value;

  if (!email || !senha) {
    alert('Preencha todos os campos!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha})
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem);
      window.location.href = 'main.html';
    } else {
      alert(data.mensagem);
    }

  } catch (err) {
    alert('Erro ao conectar com o backend!');
    console.error(err);
  }
});