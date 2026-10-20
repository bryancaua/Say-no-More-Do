const NOMES_MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
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

  for(let i = 0; i < quantidade; i++) {
    const data = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1);
    const mes = String(data.getMonth(), + 1).padStart(2, "0");
    lista.push(`${data.getFullYear()}-${mes}`);
  }

    return lista;
}