// ===== Utils globais (sem módulos) =====
(function () {
  const Utils = {
    getList(key) {
      // Lê do localStorage e transforma de texto JSON => array
      try { return JSON.parse(localStorage.getItem(key)) || []; }
      catch { return []; }
    },
    saveList(key, arr) {
      // Salva no localStorage (array/obj => texto JSON)
      localStorage.setItem(key, JSON.stringify(arr || []));
    },
    nextId() {
      // Gera um id simples usando o timestamp atual
      return Date.now();
    },
    findById(arr, id) {
      // Acha um item no array pelo id (comparando como string)
      return arr.find(item => String(item.id) === String(id));
    },
    getQueryParam(name) {
      // Lê parâmetros da URL, ex: ?sessao=123
      const url = new URL(window.location.href);
      return url.searchParams.get(name);
    },
    toCurrencyBRL(value) {
      // Formata número para R$ 0,00
      const n = Number(value) || 0;
      return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    },
    formatDateTimeLocal(value) {
      // Converte "2025-10-20T19:30" => "20/10/2025 19:30"
      if (!value) return "";
      const [date, time] = value.split('T');
      if (!date || !time) return value;
      const [y, m, d] = date.split('-');
      const [hh, mm] = time.split(':');
      return `${d}/${m}/${y} ${hh}:${mm}`;
    },
    onlyDigits(str) {
      return (str || "").replace(/\D/g, "");
    },
    maskCPF(input) {
      // Aplica máscara "000.000.000-00" enquanto digita
      let v = Utils.onlyDigits(input.value).slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, "$1.$2")
           .replace(/(\d{3})(\d)/, "$1.$2")
           .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      input.value = v;
    },
    alert(msg) {
      alert(msg);
    }
  };

  window.Utils = Utils; // deixa disponível no escopo global
})();
