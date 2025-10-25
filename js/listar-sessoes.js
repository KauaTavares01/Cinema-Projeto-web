(function () {
  const tbody = document.querySelector('#tabela-sessoes tbody');
  if (!tbody) return;

  const sessoes = Utils.getList('sessoes');
  const filmes  = Utils.getList('filmes');
  const salas   = Utils.getList('salas');

  if (sessoes.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="5" style="text-align:center;">
        Nenhuma sessão cadastrada.
      </td></tr>`;
    return;
  }

  // Ordena por data/hora para exibir do mais cedo pro mais tarde
  const ordenadas = [...sessoes].sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));

  tbody.innerHTML = ordenadas.map(s => {
    const filme = Utils.findById(filmes, s.filmeId);
    const sala  = Utils.findById(salas,  s.salaId);
    const filmeTitulo = filme ? filme.titulo : '-';
    const salaNome = sala ? sala.nome : '-';
    const dataHoraFmt = Utils.formatDateTimeLocal(s.dataHora);
    const precoFmt = Utils.toCurrencyBRL(s.preco);

    return `
      <tr>
        <td>${filmeTitulo}</td>
        <td>${salaNome}</td>
        <td>${dataHoraFmt}</td>
        <td>${precoFmt}</td>
        <td><a href="venda-ingressos.html?sessao=${s.id}">Comprar</a></td>
      </tr>
    `;
  }).join('');
})();
