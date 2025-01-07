// src/types/table.ts

// Základní rozhraní pro zprávy
interface BaseMessage {
    timestamp: string;
    probeIp: string;
    probeName: string;
    content: string;
    threat: boolean;
    type: 'syslog' | 'dataflow';
    attackType: string;
}

// Syslog zpráva
export interface SyslogMessage extends BaseMessage {
    type: 'syslog';
}

// Dataflow zpráva s dodatečnými síťovými informacemi
export interface DataflowMessage extends BaseMessage {
    type: 'dataflow';
    sourceIp: string;
    sourcePort: number;
    targetIp: string;
    targetPort: number;
}

// Typ pro jakoukoliv zprávu
export type Message = SyslogMessage | DataflowMessage;

// Props pro tabulku
export interface DataTableProps {
    data: Message[];
    loading: boolean;
}