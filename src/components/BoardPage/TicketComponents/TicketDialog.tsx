import React, { useState } from 'react';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Switch,
} from '@material-ui/core';

import { Tickets } from '../../../models/Tickets';
import TicketContent from '../../shared/TicketContent';
import { getUI, setUI, deleteTicket, getColumnById, getSelectedBoard } from '../../../reducer/base-reducer';
import DeleteConfirmDialog from '../../shared/DeteleConfirmDialog';
import TicketService from '../../../service/ticket-service';
import { useTaskDialogStyle } from '../styles';

interface Props {
  ticket: Tickets;
  open: boolean;
  setDialog: Function;
}

export default function TicketDialog({ ticket, open, setDialog }: Props) {
  const classes = useTaskDialogStyle();

  const ticketEditing = useSelector(getUI).ticketEditing || false;
  const columnsById = useSelector(getColumnById);
  const selectedBoard = useSelector(getSelectedBoard);

  const dispatch = useDispatch();

  const [isDeleteRequested, setDeleteRequested] = useState(false);

  const editing = (ticketEditing: boolean) => {
    dispatch(setUI({ ticketEditing }));
  };

  const columnId = Object.keys(columnsById).filter((colId) => {
    return columnsById[colId].ticketIds.indexOf(ticket.id) > -1;
  })[0];

  const onDelete = () => {
    dispatch(deleteTicket({ ticketId: ticket.id, columnId }));
    TicketService.removeTicket(ticket.id);
    setDialog(false);
  };

  return open ? (
    <Dialog
      open={open}
      aria-labelledby="form-dialog-title"
      onClose={() => setDialog(false)}
      onBackdropClick={() => setDialog(false)}
      fullWidth
      maxWidth="sm"
      keepMounted
    >
      <DialogTitle id="form-dialog-title">
        {ticket.title}

        <a href={`/${selectedBoard.alias}/${ticket.id}`} target="_blank">
          <IconButton aria-label="delete" className={classes.iconButton}>
            <OpenInNewIcon />
          </IconButton>
        </a>
        <FormControlLabel
          className={classes.switchController}
          labelPlacement="start"
          control={<Switch name="checkedB" color="primary" />}
          value={ticketEditing}
          onChange={(event, checked) => editing(checked)}
          label="Edit"
        />
      </DialogTitle>
      <DialogContent dividers>
        <TicketContent isEditing={ticketEditing} ticket={ticket} columnId={columnId} />
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={() => setDeleteRequested(true)} color="secondary" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button onClick={() => setDialog(false)} color="primary">
          Close
        </Button>
      </DialogActions>
      <DeleteConfirmDialog onDelete={onDelete} open={isDeleteRequested} onClose={() => setDeleteRequested(false)} />
    </Dialog>
  ) : null;
}
