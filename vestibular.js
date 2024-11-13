const apiKey = "<sua-chave-de-api>";
const databaseId = "<seu-database-id>";
const vestibularForm = document.getElementById("vestibularForm");
const vestibularList = document.getElementById("vestibularList");

// Função para carregar a lista de vestibulares
function loadVestibulares() {
  fetch(`https://${databaseId}.restdb.io/rest/vestibulares`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    }
  })
  .then(response => response.json())
  .then(data => {
    vestibularList.innerHTML = "";
    data.forEach(v => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <strong>${v.nome}</strong> - ${v.descricao} - ${v.data}
        <button onclick="editVestibular('${v._id}')">Editar</button>
        <button onclick="deleteVestibular('${v._id}')">Excluir</button>
      `;
      vestibularList.appendChild(listItem);
    });
  })
  .catch(err => console.error("Erro ao carregar vestibulares:", err));
}

// Função para adicionar novo vestibular
vestibularForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const data = document.getElementById("data").value;

  fetch(`https://${databaseId}.restdb.io/rest/vestibulares`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    },
    body: JSON.stringify({ nome, descricao, data })
  })
  .then(response => response.json())
  .then(() => {
    vestibularForm.reset();
    loadVestibulares();
  })
  .catch(err => console.error("Erro ao adicionar vestibular:", err));
});

// Função para editar vestibular
function editVestibular(id) {
  const nome = prompt("Novo nome do vestibular:");
  const descricao = prompt("Nova descrição:");
  const data = prompt("Nova data (YYYY-MM-DD):");

  if (nome && descricao && data) {
    fetch(`https://${databaseId}.restdb.io/rest/vestibulares/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apiKey,
        "cache-control": "no-cache"
      },
      body: JSON.stringify({ nome, descricao, data })
    })
    .then(() => loadVestibulares())
    .catch(err => console.error("Erro ao editar vestibular:", err));
  }
}

// Função para excluir vestibular
function deleteVestibular(id) {
  if (confirm("Tem certeza de que deseja excluir este vestibular?")) {
    fetch(`https://${databaseId}.restdb.io/rest/vestibulares/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apiKey,
        "cache-control": "no-cache"
      }
    })
    .then(() => loadVestibulares())
    .catch(err => console.error("Erro ao excluir vestibular:", err));
  }
}

// Carregar vestibulares ao iniciar a página
loadVestibulares();