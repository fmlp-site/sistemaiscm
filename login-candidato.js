document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch(`https://<seu-database-id>.restdb.io/rest/cadastros?q={"email": "${email}", "senha": "${senha}"}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "<sua-chave-de-api>",
      "cache-control": "no-cache"
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.length > 0) {
      // Login bem-sucedido, redireciona para a página candidato.html
      window.location.href = "candidato.html";
    } else {
      // Mostra mensagem de erro
      document.getElementById("mensagem").textContent = "Email ou senha incorretos";
    }
  })
  .catch(() => {
    document.getElementById("mensagem").textContent = "Erro ao realizar login";
  });
});