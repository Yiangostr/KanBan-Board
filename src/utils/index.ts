import React from 'react';
import moment from 'moment';
import { Tickets } from '../models/Tickets';
import { Column } from '../models/Column';
import to from './to';
import BoardService from '../service/board-service';
import ColumnService from '../service/column-service';
import TicketService from '../service/ticket-service';
import {
  setAllColumnsById,
  setAllTicketsById,
  setColumnIdsOfSelectedBoard,
  setSelectedBoard,
} from '../reducer/base-reducer';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss A';

// easy and reusable setter function for component input boxes
export const inputValueSetter = (setter: Function) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setter((event.target as HTMLInputElement).value);
};

// Data formatter
export const dateFormatter = (timestamp: number) => moment(timestamp).format(DATE_FORMAT);

// move element an array,
// real world example: move a ticket from one index to other
export const changeIndex = (array: any[], currentIndex: number, newIndex: number): any[] => {
  const newArray = [...array];
  const element = array[currentIndex];

  // pull element
  newArray.splice(currentIndex, 1);
  // put the new element
  newArray.splice(newIndex, 0, element);
  return newArray;
};

// create object from the array of object by using the id as the key
export const toObjectById = (array: any[]): any => {
  return array.reduce((p: any, c: any) => {
    p[c.id] = c;
    return p;
  }, {});
};

// reusable logic to mapping the initial data loading.
export const initialDataLoader = (
  { tickets, sequence: [...ticketSequence] }: any,
  { columns, sequence: [...columnSequence] }: any,
) => {
  // sort by positions
  ticketSequence.sort((a: any, b: any) => a.position - b.position);
  columnSequence.sort((a: any, b: any) => a.position - b.position);

  const getTicketByColumnId = (id: string) => ticketSequence.filter((ts: any) => ts.parentId === id);

  return {
    ticketsById: toObjectById(tickets),
    columnsById: columns.reduce((p: any, c: Column) => {
      p[c.id] = {
        ...c,
        ticketIds: getTicketByColumnId(c.id).map((t: Tickets) => t.id),
      };
      return p;
    }, {}),
    colSequence: columnSequence.map((s: any) => s.id),
  };
};

export const fetchDataForBoard = async (params: any, dispatch: Function) => {
  const [boardError, board] = await to(BoardService.getBoardByAlias(params.alias));
  if (!board) return Promise.reject();
  const [columnError, colData] = await to(ColumnService.getColumns(board.id));
  const [ticketsError, ticketData] = await to(TicketService.getTickets(board.id));

  if (boardError || columnError || ticketsError) {
    return alert('Loading Failed. Please Reload.');
  }

  const { ticketsById, columnsById, colSequence } = initialDataLoader(ticketData, colData);

  dispatch(setSelectedBoard(board));
  dispatch(setAllTicketsById(ticketsById));
  dispatch(setAllColumnsById(columnsById));
  dispatch(setColumnIdsOfSelectedBoard(colSequence));
};
