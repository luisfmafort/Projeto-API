const express = require('express');
const app = express();
app.use(express.json());

let filmes = [];

app.get('/filmes', (req, res) => {
    res.status(200).json(filmes);
});

app.post('/filmes', (req, res) => {
    const { titulo, diretor, ano, genero } = req.body;

    // Validações Completas
    if (!titulo || !diretor || !ano || !genero) {
        return res.status(400).json({ erro: "Todos os campos (titulo, diretor, ano, genero) são obrigatórios." });
    }
    if (typeof ano !== 'number' || ano < 1895) {
        return res.status(400).json({ erro: "O ano deve ser um número válido superior a 1895." });
    }
    if (titulo.length < 2) {
        return res.status(400).json({ erro: "O título deve ter pelo menos 2 caracteres." });
    }

    const novoFilme = { id: filmes.length + 1, titulo, diretor, ano, genero };
    filmes.push(novoFilme);

    res.status(201).json(novoFilme);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));