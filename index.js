import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv'

// 1. Carregar variáveis de ambiente (.env)
dotenv.config()
const API_PORT = process.env.API_PORT || 7111

// 2. Inicialização do framework (express) e ORM (prisma)
const app = express();
const prisma = new PrismaClient();

// 3. Middlewares
app.use(cors()); // Libera acesso de qualquer origem
app.use(express.json()); // Permite parsing de JSON

// 4. Definição das rotas da API
// 4.1 Rota GET /movies - Listar todos os filmes
app.get('/movies', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar filmes' });
  }
});

// 4.2 Rota GET /movies/:id - Obter um filme por ID
app.get('/movies/:id', async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    movie ? res.json(movie) : res.status(404).json({ error: 'Filme não encontrado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar filme' });
  }
});

// 4.3 Rota POST /movies - Criar novo filme
app.post('/movies', async (req, res) => {
  try {
    const { name, overview, posterurl, genres } = req.body;
    const newMovie = await prisma.movie.create({
      data: { name, overview, posterurl, genres }
    });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: 'Dados inválidos' });
  }
});

// 4.4 Rota PUT /movies/:id - Atualizar um filme
app.put('/movies/:id', async (req, res) => {
  try {
    const updatedMovie = await prisma.movie.update({
      where: { id: parseInt(req.params.id) },
      data: req.body
    });
    res.json(updatedMovie);
  } catch (error) {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// 4.5 Rota DELETE /movies/:id - Deletar filme
app.delete('/movies/:id', async (req, res) => {
  try {
    await prisma.movie.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Filme não encontrado' });
  }
});

// 5. Inicialização do servidor na porta definida (API_PORT)
app.listen(API_PORT, () => console.log(`Api node js rodando na porta ${API_PORT}`));