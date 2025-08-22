// Importando pacotes
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');


const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());            // permite comunicação frontend <-> backend
app.use(express.json());    // permite receber JSON do frontend

// Lista de contas em memória
let contas = [];

// Rota de teste
app.get('/', (req, res) => {
  res.send('Backend ZMBank funcionando!');
});

// Rota para criar conta
app.post('/criar-conta', async (req, res) => {
  const { email, senha } = req.body;

  // Verifica se email já existe
  const existe = contas.find(conta => conta.email === email);
  if (existe) {
    return res.status(400).json({ mensagem: 'Email já cadastrado' });
  }

// Criptografa a senha antes de salvar
  const senhaHash = await bcrypt.hash(senha, 10); // 10 rounds

// Adiciona conta na lista
  contas.push({ email, senha: senhaHash });
  res.json({ mensagem: 'Conta criada com sucesso!' });
});

// login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  const conta = contas.find(c => c.email === email);
  if (!conta) {
    return res.status(400).json({ mensagem: 'Email não encontrado' });
  }

  // Compara senha digitada com hash armazenado
  const senhaValida = await bcrypt.compare(senha, conta.senha);
  if (!senhaValida) {
    return res.status(400).json({ mensagem: 'Senha incorreta' });
  }

  res.json({ mensagem: 'Login realizado com sucesso!' });
});


// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
