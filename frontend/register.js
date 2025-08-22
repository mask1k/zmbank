const botaoCriar = document.querySelector('.botao-criar');
const inputEmail = document.querySelector('#email');
const inputSenha = document.querySelector('#senha');
const inputConfirma = document.querySelector('#confirma');

botaoCriar.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = inputEmail.value;
  const senha = inputSenha.value;
  const confirma = inputConfirma.value;

  if (!email || !senha || !confirma) {
    alert('Preencha todos os campos!');
    return;
  }
  if (senha !== confirma) {
    alert('Senhas não conferem!');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/criar-conta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ email, senha })
    });
  
    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem); // Conta criada com sucesso
    } else {
      alert(data.mensagem); // Email já cadastrado
    }

  } catch (err) {
    alert('Erro ao conectar com o backend!');
    console.error(err);
  }
});