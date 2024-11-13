document.getElementById("cadastroForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const dados = {
    nome: nome,
    email: email,
    senha: senha
  };

  fetch("https://<seu-database-id>.restdb.io/rest/cadastros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "<sua-chave-de-api>",
      "cache-control": "no-cache"
    },
    body: JSON.stringify(dados)
  })
  .then(response => {
    if (response.ok) {
      window.location.href = "login-candidato.html"; // Redireciona para a página de login do candidato
    } else {
      document.getElementById("mensagem").textContent = "Cadastro não realizado";
    }
  })
  .catch(() => {
    document.getElementById("mensagem").textContent = "Cadastro não realizado";
  });
});