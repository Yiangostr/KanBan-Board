import { Tickets } from '../models/Tickets';

export interface Board {
  title: string;
  alias: string;
  id: string;
}

export interface ColumnById {
  title: string;
  ticketIds: string[];
}

export interface ProjectData {
  allBoards: Board[];
  selectedBoard: Board;
  columnById: Record<string, ColumnById>;
  ticketById: Record<string, Tickets>;
  columnsOfSelectedBoard: string[];
  ui: any;
}
