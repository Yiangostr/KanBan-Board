import { configureStore, createSlice } from '@reduxjs/toolkit';
import { ColumnById, ProjectData } from './types';
import { changeIndex } from '../utils';
import { createSelector } from 'reselect/src';
import produce from 'immer';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    allBoards: [],
    columnsOfSelectedBoard: [],
    ticketById: {},
    columnById: {},
    selectedBoard: {},
    ui: {},
  },
  reducers: {
    setAllBoards: (state, { payload }) => ({ ...state, allBoards: payload }),

    clearStore: (state) =>
      produce(state, (ds) => {
        ds.columnsOfSelectedBoard = [];
        ds.ticketById = {};
        ds.columnById = {};
        ds.selectedBoard = {};
        ds.ui = {};
      }),

    addBoard: (state, { payload }) =>
      produce(state, (draftState: ProjectData) => {
        draftState.allBoards = [...draftState.allBoards, payload];
      }),

    setSelectedBoard: (state, { payload }) =>
      produce(state, (ds: ProjectData) => {
        ds.selectedBoard = payload;
      }),

    setAllColumnsById: (state, { payload }) =>
      produce(state, (ds: ProjectData) => {
        ds.columnById = payload;
      }),
    setAllTicketsById: (state, { payload }) =>
      produce(state, (ds: ProjectData) => {
        ds.ticketById = payload;
      }),
    setColumnIdsOfSelectedBoard: (state, { payload }) =>
      produce(state, (ds: ProjectData) => {
        ds.columnsOfSelectedBoard = payload;
      }),

    setColumnById: (state, { payload: { id, data } }) =>
      produce(state, (df: ProjectData) => {
        df.columnById[id] = data;
      }),
    setTicketById: (state, { payload: { id, data } }) =>
      produce(state, (df: ProjectData) => {
        df.ticketById[id] = data;
      }),

    changeColumnIndex: (state, { payload: { currentIndex, newIndex } }) =>
      produce(state, (draftState: ProjectData) => {
        draftState.columnsOfSelectedBoard = changeIndex(state.columnsOfSelectedBoard, currentIndex, newIndex);
      }),

    changeTicketIndex: (state, { payload: { currentIndex, newIndex, columnId } }) =>
      produce(state, (draftState: ProjectData) => {
        draftState.columnById[columnId].ticketIds = changeIndex(
          draftState.columnById[columnId].ticketIds,
          currentIndex,
          newIndex,
        );
      }),

    moveTicketBetweenColumns: (state, { payload: { currentIndex, newIndex, currentColumn, newColumn } }) =>
      produce(state, (draftState: ProjectData) => {
        const ticket = draftState.columnById[currentColumn].ticketIds[currentIndex];
        draftState.columnById[currentColumn].ticketIds.splice(currentIndex, 1); // remove
        draftState.columnById[newColumn].ticketIds.splice(newIndex, 0, ticket); // add
      }),

    addColumn: (state, { payload: { title, id } }) =>
      produce(state, (draftState: ProjectData) => {
        const newColumn: ColumnById = {
          ticketIds: [],
          title,
        };
        draftState.columnsOfSelectedBoard.push(id);
        draftState.columnById[id] = newColumn;
      }),

    deleteColumn: (state, { payload: { colId } }) =>
      produce(state, (ds: ProjectData) => {
        const tickets = ds.columnById[colId].ticketIds;
        tickets.forEach((ticketId) => {
          delete ds.ticketById[ticketId];
        });
        delete ds.columnById[colId];
        const index = ds.columnsOfSelectedBoard.indexOf(colId);
        ds.columnsOfSelectedBoard.splice(index, 1);
      }),

    deleteTicket: (state, { payload: { ticketId, columnId } }) =>
      produce(state, (ds: ProjectData) => {
        delete ds.ticketById[ticketId];
        const index = ds.columnById[columnId].ticketIds.indexOf(ticketId);
        ds.columnById[columnId].ticketIds.splice(index, 1);
      }),

    addTicket: (state, { payload: { ticket, columnId } }) =>
      produce(state, (draftState: ProjectData) => {
        draftState.ticketById[ticket.id] = ticket;
        draftState.columnById[columnId].ticketIds.push(ticket.id);
      }),

    setUI: (state, { payload }) =>
      produce(state, (draftState) => {
        draftState.ui = { ...draftState.ui, ...payload };
      }),
  },
});

export const {
  setAllBoards,
  setSelectedBoard,
  addColumn,
  addTicket,
  changeColumnIndex,
  changeTicketIndex,
  setColumnIdsOfSelectedBoard,
  setAllColumnsById,
  setAllTicketsById,
  setColumnById,
  setTicketById,
  moveTicketBetweenColumns,
  setUI,
  deleteColumn,
  deleteTicket,
  addBoard,
  clearStore,
} = mainSlice.actions;

export const main = (store: any) => store.main;

export const getAllBoards = createSelector(main, (store: ProjectData) => store.allBoards || []);
export const getColumnById = createSelector(main, (store: ProjectData) => store.columnById);
export const getSelectedBoard = createSelector(main, (store: ProjectData) => store.selectedBoard);
export const getTicketById = createSelector(main, (store: ProjectData) => store.ticketById);
export const getColumnsIdOfBoard = createSelector(main, (store: ProjectData) => store.columnsOfSelectedBoard);
export const getUI = createSelector(main, (store: ProjectData) => store.ui) || {};

const reducer = {
  main: mainSlice.reducer,
};

export default configureStore({
  reducer,
});
