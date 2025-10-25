(function () {
  const form = document.getElementById('form-ingresso');
  const sessaoSelect = document.getElementById('sessao');
  const cpfInput = document.getElementById('cpf');

  function textoSessao(s, filmes, salas) {
    // monta um texto amigável do option: "Filme • Sala • 20/10/2025 19:30"
    const filme = Utils.findById(filmes, s.filmeId);
    const sala  = Utils.findById(salas,  s.salaId);
    const titulo = filme ? filme.titulo : 'Filme';
    const nomeSala = sala ? sala.nome : 'Sala';
    return `${titulo} • ${nomeSala} • ${s.dataHora}`;
  }

  function carregarSessoesNoSelect() {
    if (!sessaoSelect) return;
    const sessoes = Utils.getList('sessoes');
    const filmes  = Utils.getList('filmes');
    const salas   = Utils.getList('salas');

    if (sessoes.length === 0) {
      sessaoSelect.innerHTML = '<option value="">Cadastre sessões primeiro</option>';
      return;
    }

    // Ordena por data/hora para ficar organizado
    const ordenadas = [...sessoes].sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));

    sessaoSelect.innerHTML = ordenadas.map(s =>
      `<option value="${s.id}">${textoSessao(s, filmes, salas)}</option>`
    ).join('');

    // Se veio da listagem com ?sessao=ID, já seleciona
    const sessaoParam = Utils.getQueryParam('sessao');
    if (sessaoParam) {
      const opt = Array.from(sessaoSelect.options).find(o => o.value === sessaoParam);
      if (opt) sessaoSelect.value = sessaoParam;
    }
  }

  function assentoJaVendido(sessaoId, assento) {
    const ingressos = Utils.getList('ingressos');
    return ingressos.some(i =>
      String(i.sessaoId) === String(sessaoId) &&
      i.assento.trim().toUpperCase() === assento.trim().toUpperCase()
    );
  }

  // Máscara de CPF enquanto digita
  if (cpfInput) {
    cpfInput.addEventListener('input', function () {
      Utils.maskCPF(cpfInput);
    });
  }

  carregarSessoesNoSelect();
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const sessaoId = document.getElementById('sessao').value;
    const cliente  = document.getElementById('cliente').value.trim();
    const cpf      = Utils.onlyDigits(document.getElementById('cpf').value);
    const assento  = document.getElementById('assento').value.trim().toUpperCase();
    const pagamento= document.getElementById('pagamento').value;

    // Validação simples (CPF: 11 dígitos)
    if (!sessaoId || !cliente || !cpf || cpf.length !== 11 || !assento) {
      Utils.alert('Verifique os campos: sessão, nome, CPF (11 dígitos) e assento.');
      return;
    }

    // Evita vender o mesmo assento 2 vezes para a mesma sessão
    if (assentoJaVendido(sessaoId, assento)) {
      Utils.alert(`O assento ${assento} já foi vendido para essa sessão.`);
      return;
    }

    const ingresso = {
      id: Utils.nextId(),
      sessaoId, cliente, cpf, assento, pagamento
    };

    const ingressos = Utils.getList('ingressos');
    ingressos.push(ingresso);
    Utils.saveList('ingressos', ingressos);

    Utils.alert('Venda confirmada!');
    form.reset();

    // Se veio com ?sessao=ID, mantém selecionada após o reset
    const keepSessao = Utils.getQueryParam('sessao');
    if (keepSessao) sessaoSelect.value = keepSessao;
  });
})();
