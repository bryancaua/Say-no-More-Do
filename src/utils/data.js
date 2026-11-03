const NOMES_MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export function nomeDoMes(mes) {
  const [ano, numero] = mes.split("-");
  return NOMES_MESES[Number(numero)];
}

export function anoDoMes(mes) {
  return mes.split("-")[0];
}

export function mesesDisponiveis(quantidade = 12) {
  const hoje = new Date();
  const lista = [];

  for (let i = 0; i < quantidade; i++) {
    const data = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1);
    const mes = String(data.getMonth()).padStart(2, "0");
    lista.push(`${data.getFullYear()}-${mes}`);
  }

  return lista;
}

export function diasRestantesMes(mes) {
  const [ano, numeroMes] = mes.split("-").map(Number);

  const hoje = new Date();
  const inicioDeHoje = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate()
  );

  const ultimoDiaDoMes = new Date(ano, numeroMes + 1, 0);

  const MS_POR_DIA = 1000 * 60 * 60 * 24;
  const dias = Math.round((ultimoDiaDoMes - inicioDeHoje) / MS_POR_DIA);

  return Math.max(0, dias);
}
