import { Column } from './Column';

export interface Board {
  title: string;
  description: string;
  alias: string;
  columns?: [Column];
  id: string;
}
