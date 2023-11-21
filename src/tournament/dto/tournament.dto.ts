export type TournamentDto = {
  name: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  category: string;
  participants?: string[];
  isCompleted?: boolean;
};
