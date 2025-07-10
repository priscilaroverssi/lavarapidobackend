<h1>🚗 Lava-Rápido Back-end</h1>
<p>Este projeto consiste em um sistema completo para gerenciamento de veículos em um lava-rápido, com frontend em React e backend em Node.js + Express + MySQL.</p>
<br>
<h3>📋 Visão Geral</h3>
<br>
<p>O sistema permite:</p>
<p>-Cadastro de veículos com placa, modelo, proprietário e SL</p>
<p>-Controle de status (Recebido, Em Andamento, Pronto, Retirado)</p>
<p>-Gerenciamento por localização (Independência ou Shopping</p>
<p>-Registro de quem retirou o veículo e quando</p>
<p>-Filtros avançados por data, placa, modelo, etc.</p>
<p>-Autenticação de usuários com diferentes níveis de acesso</p>
<br>
<h3>🛠 Tecnologias Utilizadas</h3>
<p>-Frontend</p>
<p>-React</p>
<p>-Material-UI (MUI)</p>
<p>-Day.js (manipulação de datas)</p>
<p>-Axios (chamadas à API)</p>
<br>
<h3>Backend</h3>
<p>-Node.js</p>
<p>-Express</p>
<p>-MySQL</p>
<p>-CORS</p>
<p>-Body-parser</p>
<br>
<h3>🌐 Endpoints da API</h3>

```plaintext
Método	Endpoint	Descrição
POST	/veiculos	Cadastra novo veículo
GET	/veiculos	Lista veículos (com filtro por data)
PUT	/veiculos/:id	Atualiza status do veículo
DELETE	/veiculos/:id	Remove veículo
🗃 Estrutura do Banco de Dados
A tabela veiculos contém os seguintes campos:
```


<h3>Campo	Tipo	Descrição</h3>

```plaintext
id	INT	Chave primária auto-incrementada
plate	VARCHAR(10)	Placa do veículo (obrigatória)
model	VARCHAR(100)	Modelo do veículo
owner	VARCHAR(255)	Dono do veículo
sl	VARCHAR(255)	Número de serviço (SL)
status	VARCHAR(100)	Status do serviço
location	VARCHAR(255)	Localização (Independência/Shopping)
timestamp	TIMESTAMP	Data/hora de cadastro
withdrawnBy	VARCHAR(255)	Quem retirou o veículo
withdrawnTimestamp	TIMESTAMP	Quando foi retirado
```
<br>
<h3>🔒 Autenticação</h3>
<p><b>O sistema possui dois tipos de usuários:</b></p>
<p>-Admin: Pode adicionar, editar e excluir veículos</p>
<p>-Viewer: Apenas visualiza os veículos</p>
<br>
<p><b>Credenciais padrão (devem ser alteradas em produção):</b></p>
<p>-Admin: admin@example.com / senhaadmin</p>
<p>-Viewer: viewer@example.com / senhaviewer</p>
