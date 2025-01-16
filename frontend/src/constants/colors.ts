// src/constants/colors.ts

// Hlavní barva aplikace
export const MAIN_COLOR = '#d162e5';

// Typy dat v aplikaci
export type ColorType = 'main' | 'syslog' | 'dataflow';

// Rozhraní pro barevné schéma
export interface ColorScheme {
    button: {
        active: string;    // Třídy pro aktivní tlačítko
        inactive: string;  // Třídy pro neaktivní tlačítko
    }
    chart: string;       // HEX barva pro graf
    background: {
        full: string;     // Světlá varianta pro pozadí
        10: string;       // 10% opacity
        20: string;       // 20% opacity
        hover: string;    // Hover varianta pro pozadí
    }
    text: string;
    hex: string;
}

// Mapování barev pro jednotlivé typy
const TYPE_COLOR_VALUES = {
    main: MAIN_COLOR,      // Používáme hlavní barvu pro 'all'
    syslog: '#3690c0',
    dataflow: '#a6761d'
} as const;

// Předpřipravené barevné třídy pro jednotlivé typy
export const TYPE_COLORS: Record<ColorType, ColorScheme> = {
    main: {
        button: {
            active: 'bg-main text-white hover:bg-main/80',
            inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        },
        chart: TYPE_COLOR_VALUES.main,
        background: {
            full: 'bg-main',
            10: 'bg-main/10',
            20: 'bg-main/20',
            hover: 'hover:bg-main/20'
        },
        text: 'text-main',
        hex: TYPE_COLOR_VALUES.main
    },
    syslog: {
        button: {
            active: 'bg-type-syslog text-white hover:bg-type-syslog/80',
            inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        },
        chart: TYPE_COLOR_VALUES.syslog,
        background: {
            full: 'bg-type-syslog',
            10: 'bg-type-syslog/10',
            20: 'bg-type-syslog/20',
            hover: 'hover:bg-type-syslog/20'
        },
        text: 'text-type-syslog',
        hex: TYPE_COLOR_VALUES.syslog
    },
    dataflow: {
        button: {
            active: 'bg-type-flow text-white hover:bg-type-flow/80',
            inactive: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        },
        chart: TYPE_COLOR_VALUES.dataflow,
        background: {
            full: 'bg-type-flow',
            10: 'bg-type-flow/10',
            20: 'bg-type-flow/20',
            hover: 'hover:bg-type-flow/20'
        },
        text: 'text-type-flow',
        hex: TYPE_COLOR_VALUES.dataflow
    }
};

// Barvy pro známé typy útoků
export const ATTACK_COLORS = {
    benign: '#8a8a8a',    
    malware: '#d95f02',  
    botnet: '#7570b3',    
    scanning: '#e7298a',  
    hijacking: '#66a61e', 
    ddos: '#e6ab02',      
    worm: '#a6761d',      
    mitm: '#984ea3'       
} as const;

// Typ pro známé typy útoků
export type AttackType = keyof typeof ATTACK_COLORS;

// Funkce pro generování barvy ze stringu
function generateColorFromString(str: string): string {
    // Vytvoříme hash ze stringu
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Převedeme hash na HEX barvu
    const c = (hash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    // Doplníme nuly na začátek, pokud je potřeba
    return '#' + '00000'.substring(0, 6 - c.length) + c;
}

// Helper pro získání barvy pro typ útoku
export function getAttackTypeColor(attackType: string | undefined | null): string {

    // Pokud není předán žádný typ, vrátíme neutrální barvu
    if (!attackType) {
        return '#607D8B';  // Neutrální šedá
    }

    const normalizedType = attackType.toLowerCase();

    // Pro známé typy vrátíme předdefinovanou barvu
    if (normalizedType in ATTACK_COLORS) {
        return ATTACK_COLORS[normalizedType as AttackType];
    }

    // Pro neznámé typy vygenerujeme barvu
    return generateColorFromString(attackType);
}

// Helper pro získání hex barvy podle typu
export const getTypeColor = (type: ColorType): string => TYPE_COLOR_VALUES[type];

// Helper pro získání hlavní barvy
export const getMainColor = (): string => MAIN_COLOR;