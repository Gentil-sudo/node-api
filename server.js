import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

// Criar um novo usuário
app.post('/usuarios', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Atualizar um usuário existente
app.put('/usuarios/:id', async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.id, 10),
      },
      data: {
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
      },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Obter todos os usuários
app.get('/usuarios', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Deletar um usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });
    res.status(200).json({ message: 'Usuário deletado' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
