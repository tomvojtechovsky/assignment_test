export interface AttackTypeDistributionPoint {
    attackType: string;
    count: number;
}

export interface DistributionLegendProps {
    data: AttackTypeDistributionPoint[];
    activeAttackType?: string | null;
    onMouseEnter?: (attackType: string) => void;
    onMouseLeave?: () => void;
}

export interface BarChartProps {
    data: AttackTypeDistributionPoint[];
    activeAttackType: string | null;
    onMouseEnter: (attackType: string) => void;
    onMouseLeave: () => void;
}