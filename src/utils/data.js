const NOMES_MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

export function nomeDoMes(mes) {
    const [ano, numero] = mes.split("-");
    console.log(ano);
    return NOMES_MESES[Number(numero)  -1];
}

export function anoDoMes(mes) {
    return mes.split("-")[0];
}