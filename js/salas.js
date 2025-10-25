(function () {
  const form = document.getElementById('form-sala');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const sala = {
      id: Utils.nextId(),
      nome: document.getElementById('nome').value.trim(),
      capacidade: Number(document.getElementById('capacidade').value || 0),
      tipo: document.getElementById('tipo').value // 2D, 3D, IMAX
    };

    if (!sala.nome || !sala.capacidade) {
      Utils.alert('Preencha os campos obrigatórios.');
      return;
    }

    const salas = Utils.getList('salas');
    salas.push(sala);
    Utils.saveList('salas', salas);

    Utils.alert('Sala cadastrada com sucesso!');
    form.reset();
  });
})();
