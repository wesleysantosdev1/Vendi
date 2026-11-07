// Formata número como moeda brasileira: 1284.5 -> "R$ 1.284,50".
// Aceita null/undefined/NaN (vira R$ 0,00) para não quebrar a tela com dado faltando.
export function formatBRL(value: number | null | undefined): string {
    const safe = Number.isFinite(value) ? (value as number) : 0;
    return `R$ ${safe.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}
