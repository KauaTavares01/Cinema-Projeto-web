// sessoes.js (corrigido) - Cadastro de Sessões
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-sessao');
    const filmeSelect = document.getElementById('filme');
    const salaSelect  = document.getElementById('sala');

    if (!filmeSelect || !salaSelect) {
      console.warn('Elemento <select id="filme"> ou <select id="sala"> não encontrado. Verifique os IDs no HTML.');
      return;
    }

    function preencherSelects() {
      let filmes = [];
      let salas  = [];
      try { filmes = JSON.parse(localStorage.getItem('filmes')) || []; } catch {}
      try { salas  = JSON.parse(localStorage.getItem('salas'))  || []; } catch {}

      // FILMES
      if (!filmes.length) {
        filmeSelect.innerHTML = '<option value="">Cadastre filmes primeiro</option>';
      } else {
        filmeSelect.innerHTML = filmes.map(f => `<option value="${f.id}">${f.titulo}</option>`).join('');
      }

      // SALAS
      if (!salas.length) {
        salaSelect.innerHTML = '<option value="">Cadastre salas primeiro</option>';
      } else {
        salaSelect.innerHTML = salas.map(s => `<option value="${s.id}">${s.nome}</option>`).join('');
      }
    }

    preencherSelects();

    if (!form) {
      console.warn('Formulário #form-sessao não encontrado.');
      return;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const sessao = {
        id: Date.now(),
        filmeId: (document.getElementById('filme') || {}).value,
        salaId: (document.getElementById('sala') || {}).value,
        dataHora: (document.getElementById('dataHora') || {}).value,
        preco: Number((document.getElementById('preco') || {}).value || 0),
        idioma: (document.getElementById('idioma') || {}).value,
        formato: (document.getElementById('formato') || {}).value
      };

      if (!sessao.filmeId || !sessao.salaId || !sessao.dataHora || !sessao.preco) {
        alert('Preencha os campos obrigatórios (filme, sala, data/hora e preço).');
        return;
      }

      let sessoes = [];
      try { sessoes = JSON.parse(localStorage.getItem('sessoes')) || []; } catch {}
      sessoes.push(sessao);
      localStorage.setItem('sessoes', JSON.stringify(sessoes));

      alert('Sessão cadastrada com sucesso!');
      form.reset();
      preencherSelects();
    });
  });
})();
