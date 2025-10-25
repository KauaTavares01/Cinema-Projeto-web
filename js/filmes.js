(function () {
  const form = document.getElementById('form-filme');
  if (!form) return; // garante que só roda na página certa

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evita recarregar a página

    // 1) Captura valores do formulário
    const filme = {
      id: Utils.nextId(),
      titulo: document.getElementById('titulo').value.trim(),
      genero: document.getElementById('genero').value.trim(),
      descricao: document.getElementById('descricao').value.trim(),
      classificacao: document.getElementById('classificacao').value,
      duracao: Number(document.getElementById('duracao').value || 0),
      estreia: document.getElementById('estreia').value
    };

    // 2) Validação básica
    if (!filme.titulo || !filme.genero || !filme.duracao || !filme.estreia) {
      Utils.alert('Preencha os campos obrigatórios.');
      return;
    }

    // 3) Lê a lista atual, adiciona e salva de volta
    const filmes = Utils.getList('filmes');
    filmes.push(filme);
    Utils.saveList('filmes', filmes);

    // 4) Feedback e limpa formulário
    Utils.alert('Filme cadastrado com sucesso!');
    form.reset();
  });
})();
