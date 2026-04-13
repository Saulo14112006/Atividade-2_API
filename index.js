const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Banco de Dados em Memória (10 registros iniciais)
let livros = [
    { id: 1, titulo: "O Império Final", autor: "Brandon Sanderson", ano: 2006, genero: "Fantasia" },
    { id: 2, titulo: "O Nome do Vento", autor: "Patrick Rothfuss", ano: 2007, genero: "Fantasia" },
    { id: 3, titulo: "O Caminho dos Reis", autor: "Brandon Sanderson", ano: 2010, genero: "Fantasia" },
    { id: 4, titulo: "Neuromancer", autor: "William Gibson", ano: 1984, genero: "Sci-Fi" },
    { id: 5, titulo: "Duna", autor: "Frank Herbert", ano: 1965, genero: "Sci-Fi" },
    { id: 6, titulo: "Fundação", autor: "Isaac Asimov", ano: 1951, genero: "Sci-Fi" },
    { id: 7, titulo: "O Hobbit", autor: "J.R.R. Tolkien", ano: 1937, genero: "Fantasia" },
    { id: 8, titulo: "1984", autor: "George Orwell", ano: 1949, genero: "Distopia" },
    { id: 9, titulo: "O Poço da Ascensão", autor: "Brandon Sanderson", ano: 2007, genero: "Fantasia" },
    { id: 10, titulo: "O Herói das Eras", autor: "Brandon Sanderson", ano: 2008, genero: "Fantasia" }
];

// --- ENDPOINTS GET ---

// Listar todos
app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

// Buscar por ID
app.get('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
    res.status(200).json(livro);
});

// --- ENDPOINT POST ---

app.post('/livros', (req, res) => {
    const { titulo, autor, ano, genero } = req.body;

    // Validação de campos obrigatórios
    if (!titulo || !autor || !ano || !genero) {
        return res.status(400).json({ erro: "Todos os campos (titulo, autor, ano, genero) são obrigatórios." });
    }

    // Validação de tipo de dado
    if (typeof ano !== 'number' || ano < 0) {
        return res.status(400).json({ erro: "O ano deve ser um número válido." });
    }

    const novoLivro = {
        id: livros.length > 0 ? livros[livros.length - 1].id + 1 : 1,
        titulo,
        autor,
        ano,
        genero
    };

    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

// --- ENDPOINT PUT (Atualizar) ---

app.put('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado para atualização" });

    const { titulo, autor, ano, genero } = req.body;

    // Atualiza apenas o que foi enviado (ou mantém o antigo)
    livro.titulo = titulo || livro.titulo;
    livro.autor = autor || livro.autor;
    livro.ano = typeof ano === 'number' ? ano : livro.ano;
    livro.genero = genero || livro.genero;

    res.status(200).json(livro);
});

// --- ENDPOINT DELETE ---

app.delete('/livros/:id', (req, res) => {
    const index = livros.findIndex(l => l.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ erro: "Livro não encontrado para exclusão" });

    livros.splice(index, 1);
    res.status(204).send(); // Sucesso sem conteúdo
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});