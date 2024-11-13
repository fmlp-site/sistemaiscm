const apiKey = "<sua-chave-de-api>";
const databaseId = "<seu-database-id>";
const locaisContainer = document.getElementById("locaisContainer");
const localForm = document.getElementById("localForm");

// Função para carregar os locais de prova
function loadLocais() {
  fetch(`https://${databaseId}.restdb.io/rest/locais`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    }
  })
  .then(response => response.json())
  .then(data => {
    locaisContainer.innerHTML = "";
    data.forEach(local => {
      const localDiv = document.createElement("div");
      localDiv.classList.add("local-item");
      localDiv.innerHTML = `
        <p><strong>Nome do Local:</strong> ${local.nomeLocal}</p>
        <p><strong>Endereço:</strong> ${local.endereco}</p>
        <button onclick="editLocal('${local._id}', '${local.nomeLocal}', '${local.endereco}')">Editar</button>
        <button onclick="deleteLocal('${local._id}')">Excluir</button>
        <hr>
      `;
      locaisContainer.appendChild(localDiv);
    });
  })
  .catch(err => console.error("Erro ao carregar locais:", err));
}

// Função para adicionar novo local
localForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const novoLocal = {
    nomeLocal: document.getElementById("nomeLocal").value,
    endereco: document.getElementById("endereco").value
  };

  fetch(`https://${databaseId}.restdb.io/rest/locais`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apiKey,
      "cache-control": "no-cache"
    },
    body: JSON.stringify(novoLocal)
  })
  .then(() => {
    alert("Local adicionado com sucesso!");
    localForm.reset();
    loadLocais();
  })
  .catch(err => console.error("Erro ao adicionar local:", err));
});

// Função para editar um local
function editLocal(id, nomeAtual, enderecoAtual) {
  const novoNome = prompt("Atualizar nome do local:", nomeAtual);
  const novoEndereco = prompt("Atualizar endereço do local:", enderecoAtual);

  if (novoNome && novoEndereco) {
    const localAtualizado = {
      nomeLocal: novoNome,
      endereco: novoEndereco
    };

    fetch(`https://${databaseId}.restdb.io/rest/locais/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apiKey,
        "cache-control": "no-cache"
      },
      body: JSON.stringify(localAtualizado)
    })
    .then(() => {
      alert("Local atualizado com sucesso!");
      loadLocais();
    })
    .catch(err => console.error("Erro ao atualizar local:", err));
  }
}

// Função para excluir um local
function deleteLocal(id) {
  if (confirm("Tem certeza de que deseja excluir este local?")) {
    fetch(`https://${databaseId}.restdb.io/rest/locais/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apiKey,
        "cache-control": "no-cache"
      }
    })
    .then(() => {
      alert("Local excluído com sucesso!");
      loadLocais();
    })
    .catch(err => console.error("Erro ao excluir local:", err));
  }
}

// Carregar locais de prova ao iniciar a página
loadLocais();