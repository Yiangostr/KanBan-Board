import React from 'react';

import {
  DragDropContext,
  DropResult,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import ColumnContainer from './ColumnComponent/ColumnContainer';
import PlaceholderAddNewButton from '../shared/PlaceholderAddNewButton';
import ColumnService from '../../service/column-service';
import TicketService from '../../service/ticket-service';

import { useBoardStyles } from './styles';
import { columnFactory } from '../../models/factory';
import { ColumnById } from '../../reducer/types';
import {
  getColumnById,
  getColumnsIdOfBoard,
  changeColumnIndex,
  changeTicketIndex,
  moveTicketBetweenColumns,
  addColumn,
  getSelectedBoard,
} from '../../reducer/base-reducer';

export default function Project() {
  const columnById = useSelector(getColumnById);
  const columnIdsOfBoard = useSelector(getColumnsIdOfBoard);
  const selectedBoard = useSelector(getSelectedBoard);

  const dispatcher = useDispatch();

  const classNames = useBoardStyles();

  const handleDragEnd = (dropResult: DropResult) => {
    const { type, source, destination, draggableId } = dropResult;
    if (!destination) {
      return;
    }
    if (type === 'column') {
      dispatcher(changeColumnIndex({ currentIndex: source.index, newIndex: destination.index }));
      ColumnService.moveColumn(draggableId, selectedBoard.id, destination.index, source.index);
    } else {
      if (source.droppableId === destination.droppableId) {
        // ticket movement on the same column
        dispatcher(
          changeTicketIndex({
            columnId: destination.droppableId,
            currentIndex: source.index,
            newIndex: destination.index,
          }),
        );
        TicketService.moveTicket(draggableId, destination.droppableId, destination.index, source.index);
      } else {
        // ticket movement between two columns
        dispatcher(
          moveTicketBetweenColumns({
            currentIndex: source.index,
            newIndex: destination.index,
            currentColumn: source.droppableId,
            newColumn: destination.droppableId,
          }),
        );
        const sourceLastIndex = columnById[source.droppableId].ticketIds.length;
        const destinationLastIndex = columnById[destination.droppableId].ticketIds.length;
        (async () => {
          await TicketService.moveTicket(draggableId, source.droppableId, sourceLastIndex, source.index);
          await TicketService.moveTicket(draggableId, destination.droppableId, destination.index, destinationLastIndex);
        })();
      }
    }
  };

  return (
    <div className={classNames.board}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable type="column" droppableId="projectBoard" direction="horizontal">
          {(provided: DroppableProvided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps} className={classNames.lanes}>
                {columnIdsOfBoard.map((id, index) => {
                  const column: ColumnById = columnById[id];

                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided: DraggableProvided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={classNames.laneContainer}
                          >
                            <ColumnContainer dragHandleProps={provided.dragHandleProps} column={column} columnId={id} />
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}

                {provided.placeholder}

                <PlaceholderAddNewButton
                  buttonName="Add Column"
                  onAdd={(title) => {
                    const column = columnFactory(title);
                    ColumnService.createColumn(column, selectedBoard.id, columnIdsOfBoard.length);
                    dispatcher(addColumn(column));
                  }}
                />
              </div>
            );
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
