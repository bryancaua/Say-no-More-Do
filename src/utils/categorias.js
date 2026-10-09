export const CATEGORIAS = {
  estudos: { label: "Estudos", cor: "var(--color-estudos)" },
  saude: { label: "Saúde", cor: "var(--color-saude)" },
  financas: { label: "Finanças", cor: "var(--color-financas)" },
  carreira: { label: "Carreira", cor: "var(--color-carreira)" },
  pessoal: { label: "Pessoal", cor: "var(--color-pessoal)" },
};

export function getCategoria(chave) {
    return CATEGORIAS[chave] ?? {label: chave, cor: "var(--color-pessoal)"}
}
