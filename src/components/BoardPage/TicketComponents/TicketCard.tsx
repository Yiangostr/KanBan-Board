import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import TicketDialog from '../TicketComponents/TicketDialog';

import { useCardStyles } from '../styles';
import { Tickets } from '../../../models/Tickets';
import { getUI, setUI } from '../../../reducer/base-reducer';

export interface Props {
  ticket: Tickets;
  statusId: string;
  dragHandleProps: DraggableProvidedDragHandleProps | undefined;
}

export default function TaskCard({ ticket, dragHandleProps }: Props) {
  const classNames = useCardStyles();
  const isTicketEditingDialog = useSelector(getUI).ticketDialog;
  const dispatch = useDispatch();

  const [open, setOpen] = useState(isTicketEditingDialog);

  const openDialog = (ticketDialog: boolean) => {
    dispatch(setUI({ ticketDialog }));
    if (!ticketDialog) {
      dispatch(setUI({ ticketEditing: false }));
    }
    setOpen(ticketDialog);
  };

  return (
    <Paper className={classNames.task} {...dragHandleProps} onDoubleClick={() => openDialog(true)}>
      <div className={classNames.taskHeader}>
        <div>
          <Typography className={classNames.title}>{ticket.title}</Typography>
        </div>
      </div>

      <TicketDialog ticket={ticket} open={open} setDialog={openDialog} />
    </Paper>
  );
}
