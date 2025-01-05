// filters.ts
export type DataType = 'all' | 'syslog' | 'dataflow';
export type AttackType = 'all' | 'botnet' | 'ddos' | 'malware' | 'scanning' | 'worm' | 'hijacking' | 'MITM' | 'benign';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export interface GlobalFiltersState {
  dataType: DataType;
  dateRange: DateRange;
  attackType: AttackType;
}