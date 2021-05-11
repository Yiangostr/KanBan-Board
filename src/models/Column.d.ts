import { Tickets } from './Tickets';

export interface Column {
  title: string;
  id: string;
  tickets?: Tickets[];
}
