export class DashboardResultDto {
  totalFarms: number;
  totalHectares: number;
  charts: {
    byState: Record<string, number>;
    byCulture: Record<string, number>;
    landUse: {
      agriculture: number;
      vegetation: number;
    };
  };
}
