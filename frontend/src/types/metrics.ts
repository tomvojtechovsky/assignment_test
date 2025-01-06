// frontend/src/types/metrics.ts
export interface Metrics {
  totalCount: number;
  syslogCount: number;
  dataflowCount: number;
  threatsCount: number;
  attacksByType: {
    attackType: string;
    count: number;
  }[];
  last24hCount: number;
}