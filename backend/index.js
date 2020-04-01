const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const MSG_GET_ALL  = "Buscando Todos";
const MSG_GET_ONE  = "Buscando um";
const MSG_INSERT   = "Inserido um";
const MSG_UPDATE   = "Atualizando um";
const MSG_DELETE   = "Deletando um";

app.use(bodyParser.json());

// GET ALL
app.get('/cmds', (req, res) => {
    console.log("Buscando all");
    res.status(200).send(MSG_GET_ALL);
});

// GET ONE
app.get('/cmd', (req, res) => {
    console.log("Buscando one");
    res.status(200).send(MSG_GET_ONE);
});

// INSERT
app.post('/cmd', (req, res) => {
    console.log("Inserindo");
    res.status(200).send(MSG_INSERT);
});

// UPDATE
app.put('/cmd', (req, res) => {
    console.log("Atualizando");
    res.status(200).send(MSG_UPDATE);
});

//DELETE
app.delete('/cmd', (req, res) => {
    console.log("Deletando");
    res.status(200).send(MSG_DELETE);
});

console.log("Servidor iniciado na porta 1111...")
app.listen(1111, '0.0.0.0');