const apiKey = "<sua-chave-de-api>";
const databaseId = "<seu-database-id>";
const inscricoesContainer = document.getElementById("inscricoesContainer");

// Função para carregar inscrições
function loadInscricoes() {
  fetch(`https://${databaseId}.restdb.io/rest/inscricoes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    }
  })
  .then(response => response.json())
  .then(data => {
    inscricoesContainer.innerHTML = "";
    data.forEach(inscricao => {
      const inscricaoDiv = document.createElement("div");
      inscricaoDiv.classList.add("inscricao-item");
      inscricaoDiv.innerHTML = `
        <p><strong>Nome:</strong> ${inscricao.nome}</p>
        <p><strong>Email:</strong> ${inscricao.email}</p>
        <p><strong>Status Atual:</strong> ${inscricao.status}</p>
        <label for="status">Atualizar Status:</label>
        <select id="status-${inscricao._id}" onchange="updateStatus('${inscricao._id}')">
          <option value="Aguardando" ${inscricao.status === "Aguardando" ? "selected" : ""}>Aguardando</option>
          <option value="Homologada" ${inscricao.status === "Homologada" ? "selected" : ""}>Homologada</option>
          <option value="Não Homologada" ${inscricao.status === "Não Homologada" ? "selected" : ""}>Não Homologada</option>
        </select>
        <hr>
      `;
      inscricoesContainer.appendChild(inscricaoDiv);
    });
  })
  .catch(err => console.error("Erro ao carregar inscrições:", err));
}

// Função para atualizar o status da inscrição
function updateStatus(id) {
  const statusSelect = document.getElementById(`status-${id}`);
  const novoStatus = statusSelect.value;

  fetch(`https://${databaseId}.restdb.io/rest/inscricoes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    },
    body: JSON.stringify({ status: novoStatus })
  })
  .then(() => {
    alert("Status atualizado com sucesso!");
    loadInscricoes();
  })
  .catch(err => console.error("Erro ao atualizar status:", err));
}

// Carregar inscrições ao iniciar a página
loadInscricoes();