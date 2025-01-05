// frontend/src/types/activity.ts
export interface ActivityDataPoint {
    label: string;
    count: number;
  }
  
  export interface ActivityDataResponse {
    activityData: ActivityDataPoint[];
  }