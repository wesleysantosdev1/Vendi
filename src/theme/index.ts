import { TextStyle } from 'react-native';

// Fonte única de verdade do visual do app (paleta "Papel & Lima").
// Telas e componentes importam daqui; não espalhar hex/tamanhos soltos.

export const colors = {
    // Superfícies
    paper: '#F4F3EE', // fundo das telas (papel quente)
    surface: '#FFFFFF', // grupos/cards sobre o papel
    sunken: '#EAE8E1', // campos de texto, controles segmentados
    line: '#E2E0D8', // divisórias finas

    // Texto
    ink: '#111111', // texto principal e superfícies escuras
    inkSoft: '#6B6A63', // texto secundário
    inkFaint: '#9A988F', // placeholder, ícones apagados

    // Marca
    lime: '#C6F432', // destaque: CTA principal, números-chave sobre o escuro
    limeSoft: '#EEFBC4', // fundo suave de seleção
    onLime: '#111111', // texto sobre o lima

    // Sobre superfícies escuras (card tinta, tab bar)
    onInk: '#F4F3EE',
    onInkSoft: '#8C8B84',
    inkRaised: '#232321', // divisórias/realces dentro do escuro

    // Estados
    danger: '#E5484D',
    onDanger: '#FFFFFF',
    dangerSoft: '#FBE4E3',
    dangerOnInk: '#FF7A6B', // vermelho legível sobre o escuro (gráfico)
    warning: '#B45309',
    warningSoft: '#FDF0D5',

    overlay: 'rgba(17, 17, 17, 0.45)',
} as const;

export const spacing = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20, // padding lateral padrão das telas
    xxl: 24,
    xxxl: 32,
} as const;

export const radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
} as const;

// Valores monetários usam algarismos de largura fixa para alinhar em coluna.
const tabular: TextStyle['fontVariant'] = ['tabular-nums'];

export const type = {
    display: { fontSize: 40, fontWeight: '800', letterSpacing: -1.2, fontVariant: tabular },
    title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.6, color: colors.ink },
    heading: { fontSize: 20, fontWeight: '700', letterSpacing: -0.3, color: colors.ink },
    subheading: { fontSize: 16, fontWeight: '700', color: colors.ink },
    body: { fontSize: 15, fontWeight: '400', color: colors.ink },
    bodyStrong: { fontSize: 15, fontWeight: '600', color: colors.ink },
    caption: { fontSize: 13, fontWeight: '400', color: colors.inkSoft },
    // Rótulo pequeno em caixa alta ("VENDIDO HOJE")
    eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.1, textTransform: 'uppercase', color: colors.inkSoft },
    money: { fontSize: 15, fontWeight: '700', color: colors.ink, fontVariant: tabular },
} as const satisfies Record<string, TextStyle>;

export const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 } as const;
