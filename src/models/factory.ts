import { Board } from './Board';
import { generate } from 'short-uuid';
import { Column } from './Column';
import { Tickets } from './Tickets';

export const boardFactory = (title: string, description: string, alias: string): Board => ({
  alias,
  title,
  description,
  id: generate(),
});

export const columnFactory = (title: string): Column => ({
  title,
  id: generate(),
});

export const ticketFactory = (title: string, description: string, createdAt: number, updatedAt: number): Tickets => ({
  title,
  description,
  createdAt,
  updatedAt,
  id: generate(),
});
