const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Configuração do pool de conexões
const pool = mysql.createPool({
  host: "38.242.209.31",
  user: "lavarapido",
  password: "5XhB9AeDKqTgbiHEW2e7Kv4bdD",
  database: "lavarapido",
  timezone: "America/Sao_Paulo",
  connectionLimit: 10, // Define o limite máximo de conexões
  connectTimeout: 300000, // Tempo limite de conexão de 5 minutos
});

// Função para obter a data e hora local
function getLocalTimestamp() {
  const now = new Date();
  const localOffset = -3 * 60 * 60 * 1000; // Offset para "America/Sao_Paulo" (UTC-3)
  const localDate = new Date(now.getTime() + localOffset);
  return localDate.toISOString().slice(0, 19).replace("T", " ");
}

// Função para lidar com consultas ao banco de dados usando o pool
function queryDatabase(query, values, res, successMessage) {
  pool.query(query, values, (err, results) => {
    if (err) {
      console.error("Erro ao acessar o banco de dados:", err);
      return res.status(500).json({ error: "Erro ao acessar o banco de dados" });
    }
    res.json(successMessage ? { message: successMessage, results } : results);
  });
}

// Criação da tabela veiculos, se não existir
pool.query(`
  CREATE TABLE IF NOT EXISTS veiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plate VARCHAR(10) NOT NULL,
    model VARCHAR(100),
    owner VARCHAR(255),
    sl VARCHAR(255),
    status VARCHAR(100),
    location VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    withdrawnBy VARCHAR(255),
    withdrawnTimestamp TIMESTAMP NULL DEFAULT NULL
  )
`, (err) => {
  if (err) {
    console.error("Erro ao criar tabela:", err);
    return;
  }
  console.log("Tabela veiculos pronta (ou já existia).");
});

// Rota para cadastrar um veículo (POST)
app.post("/veiculos", (req, res) => {
  const { plate, model, owner, sl, status, location } = req.body;

  if (!plate || !model || !owner || !sl) {
    return res.status(400).json({ error: "Dados do veículo incompletos" });
  }

  const timestamp = getLocalTimestamp();
  const query = `INSERT INTO veiculos (plate, model, owner, sl, status, location, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [plate, model, owner, sl, status, location, timestamp];

  queryDatabase(query, values, res, "Veículo cadastrado com sucesso");
});

// Rota para atualizar o status de um veículo (PUT)
app.put("/veiculos/:id", (req, res) => {
  const vehicleId = req.params.id;
  const { status, withdrawnBy } = req.body;

  if (status === "Retirado" && !withdrawnBy) {
    return res.status(400).json({ error: "O nome da pessoa responsável é necessário quando o status é 'Retirado'" });
  }

  const withdrawnTimestamp = status === "Retirado" ? getLocalTimestamp() : null;
  const query = `UPDATE veiculos SET status = ?, withdrawnBy = ?, withdrawnTimestamp = ? WHERE id = ?`;
  const values = [status, status === "Retirado" ? withdrawnBy : null, withdrawnTimestamp, vehicleId];

  queryDatabase(query, values, res, "Status atualizado com sucesso");
});

// Rota para obter todos os veículos ou filtrar por data
app.get("/veiculos", (req, res) => {
  const { date } = req.query;
  let query;
  let queryParams = [];

  if (date) {
    const startOfDay = `${date} 00:00:00`;
    const endOfDay = `${date} 23:59:59`;

    query = `SELECT * FROM veiculos WHERE timestamp >= ? AND timestamp <= ? ORDER BY timestamp ASC`;
    queryParams = [startOfDay, endOfDay];
  } else {
    query = `SELECT * FROM veiculos ORDER BY timestamp DESC`;
  }

  queryDatabase(query, queryParams, res);
});

// Rota para deletar um veículo
app.delete("/veiculos/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM veiculos WHERE id = ?";

  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error("Erro ao deletar veículo:", err);
      return res.status(500).json({ error: "Erro ao deletar veículo" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Veículo não encontrado" });
    }
    res.status(204).send();
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
