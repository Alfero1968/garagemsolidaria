const fs = require("fs");
const path = require("path");
const dataPath = path.join(__dirname, "data.json");

// Função auxiliar para ler dados
function loadData() {
  const raw = fs.readFileSync(dataPath);
  return JSON.parse(raw);
}

// Função auxiliar para salvar dados
function saveData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// -----------------------------------------------------
// LISTAR GARAGENS DISPONÍVEIS
// -----------------------------------------------------
exports.listGarages = (req, res) => {
  const bd = loadData();
  res.json(bd.garagens);
};

// -----------------------------------------------------
// CADASTRAR UMA GARAGEM
// -----------------------------------------------------
exports.addGarage = (req, res) => {
  const { numero, bloco, dono } = req.body;

  const bd = loadData();

  const nova = {
    id: Date.now(),
    numero,
    bloco,
    dono,
    disponivel: false,
    horario: null,
    reservadoPor: null,
  };

  bd.garagens.push(nova);
  saveData(bd);

  res.json({ message: "Garagem cadastrada!", garagem: nova });
};

// -----------------------------------------------------
// MARCAR GARAGEM COMO DISPONÍVEL
// -----------------------------------------------------
exports.setAvailable = (req, res) => {
  const { id } = req.params;
  const { horario } = req.body;

  const bd = loadData();
  const garagem = bd.garagens.find(g => g.id == id);

  if (!garagem) {
    return res.status(404).json({ error: "Garagem não encontrada" });
  }

  garagem.disponivel = true;
  garagem.horario = horario;
  garagem.reservadoPor = null;

  saveData(bd);

  res.json({ message: "Garagem disponibilizada!", garagem });
};

// -----------
