export const CATEGORIAS = [
  { id: "estudos", label: "Estudos", cor: "var(--color-estudos)" },
  { id: "saude", label: "Saúde", cor: "var(--color-saude)" },
  { id: "financas",  label: "Finanças", cor: "var(--color-financas)" },
  { id: "carreira",  label: "Carreira", cor: "var(--color-carreira)" },
  { id: "pessoal",  label: "Pessoal", cor: "var(--color-pessoal)" }
];

export function getCategoria(chave) {
    return CATEGORIAS.find((categoria) => categoria.id == chave) ?? {label: chave, cor: "var(--color-pessoal)"}
}
