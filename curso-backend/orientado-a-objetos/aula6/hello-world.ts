import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

// Carregar variáveis de ambiente
config();

// Definir __filename e __dirname para resolver caminhos corretamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Criar a aplicação Express
const app = express();

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Definir URL e porta com base nas variáveis de ambiente
const url = process.env.API_BASE_URL || 'http://localhost';
const port = Number(process.env.API_PORT) || 3300;

// Dados fictícios de usuários
const users = [
  { name: 'Fulano', age: 20 },
  { name: 'Ciclano', age: 35 },
];

// Rota principal
app.get('/api', (req: Request, res: Response) => {
  res.status(200).send('<h1 style="color: red;">Hello World</h1>');
});

// Rota para listar os usuários
app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

// Rota para página inicial (HTML)
app.get('/', (req: Request, res: Response) => {
  const homePath = path.join(__dirname, 'public', 'home.html');
  try {
    const homePage = readFileSync(homePath, 'utf-8');
    res.status(200).send(homePage);
  } catch (error) {
    res.status(500).send('<h1>Erro: Página inicial não encontrada.</h1>');
  }
});

// Iniciar o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em ${url}:${port}`);
});
