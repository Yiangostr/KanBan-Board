import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import {
  Draggable,
  DraggableProvided,
  DraggableProvidedDragHandleProps,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { DragIndicator } from '@material-ui/icons';

import TaskCard from '../TicketComponents/TicketCard';
import PlaceholderAddNewButton from '../../shared/PlaceholderAddNewButton';
import ColumnAction from './ColumnAction';
import TicketService from '../../../service/ticket-service';

import { useCommonStyles, useLaneStyles } from '../styles';
import { ColumnById } from '../../../reducer/types';
import { useDispatch, useSelector } from 'react-redux';
import { getTicketById, addTicket } from '../../../reducer/base-reducer';
import { Tickets } from '../../../models/Tickets';
import { ticketFactory } from '../../../models/factory';

export interface Props {
  column: ColumnById;
  columnId: string;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

const ColumnContainer = ({ column, dragHandleProps, columnId }: Props) => {
  const classNames = useLaneStyles();
  const commonClassNames = useCommonStyles();

  const ticketsById = useSelector(getTicketById);

  const dispatch = useDispatch();

  const onAddNewTicket = (title: string) => {
    const ticket = ticketFactory(title, '', Date.now(), Date.now());
    dispatch(addTicket({ ticket, columnId }));
    TicketService.createTicket(ticket, columnId, column.ticketIds.length);
  };

  return (
    <Paper className={`${classNames.lane} board-status`} {...dragHandleProps}>
      <div className={classNames.laneHeader}>
        <span className={commonClassNames.dragHandle}>
          <DragIndicator fontSize="small" />
        </span>

        <Typography align="center" className={classNames.laneTitle}>
          {column.title}
        </Typography>

        <div>
          <ColumnAction colId={columnId} />
        </div>
      </div>

      <Droppable type="ticket" droppableId={columnId}>
        {(provided: DroppableProvided) => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps} className={classNames.tasks}>
              {column.ticketIds.map((ticketId, index) => {
                const ticket: Tickets = ticketsById[ticketId];

                return (
                  <Draggable key={ticketId} draggableId={ticketId} index={index}>
                    {(provided: DraggableProvided) => {
                      return (
                        <div className={classNames.taskContainer} ref={provided.innerRef} {...provided.draggableProps}>
                          <TaskCard ticket={ticket} statusId={ticket.id} dragHandleProps={provided.dragHandleProps} />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}

              {provided.placeholder}

              <PlaceholderAddNewButton buttonName="Add Ticket" onAdd={onAddNewTicket} />
            </div>
          );
        }}
      </Droppable>
    </Paper>
  );
};

export default ColumnContainer;
