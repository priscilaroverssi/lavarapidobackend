const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json()); // Para interpretar JSON
app.use(cors()); // Adicione esta linha

// Rota para obter todos os veículos
app.get("/veiculos", async (req, res) => {
  const vehicles = await getVehicles();

  return res.status(200).json({ vehicles });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
