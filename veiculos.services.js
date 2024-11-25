const connection = mysql.createConnection({
  host: "38.242.209.31", // Altere para seu host
  user: "lavarapido", // Altere para seu usuário
  password: "5XhB9AeDKqTgbiHEW2e7Kv4bdD", // Altere para sua senha
  database: "lavarapido", // Altere para seu banco de dados
});

async function getVehicles() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM veiculos", (err, results) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve(results);
    });
  });
}
