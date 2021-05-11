import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Switch,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import TicketContent from '../shared/TicketContent';
import { useTicketPageStyle } from './styles';
import { fetchDataForBoard } from '../../utils';
import { deleteTicket, getColumnById, getTicketById } from '../../reducer/base-reducer';
import DeleteConfirmDialog from '../shared/DeteleConfirmDialog';
import TicketService from '../../service/ticket-service';

export default function TicketPage() {
  const dispatch = useDispatch();
  const params = useParams<any>();
  const [isLoading, setLoading] = useState(true);

  const [isDeleteRequested, setDeleteRequested] = useState(false);

  const [deleteSuccessDialog, setDeleteSuccessDialog] = useState(false);

  const ticketsById = useSelector(getTicketById);
  const columnsById = useSelector(getColumnById);

  useEffect(() => {
    fetchDataForBoard(params, dispatch)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        alert('failed to fetch data');
      });
  }, []);

  const ticket = ticketsById[params.ticketId];

  const onDelete = () => {
    dispatch(deleteTicket({ ticketId: ticket.id, columnId }));
    TicketService.removeTicket(ticket.id);
    setDeleteSuccessDialog(true);
  };

  const [isEditing, setEditing] = useState(false);
  const styles = useTicketPageStyle();

  const columnId = Object.keys(columnsById).filter((colId) => {
    return columnsById[colId].ticketIds.indexOf(params.ticketId) > -1;
  })[0];

  return (
    <Grid container direction="row" justify="center" alignItems="center" className={styles.container}>
      {!isLoading && ticket ? (
        <Paper className={styles.paper}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton aria-label="delete" color="secondary" onClick={() => setDeleteRequested(true)}>
              <DeleteIcon />
            </IconButton>
            <FormControlLabel
              labelPlacement="start"
              control={<Switch name="checkedB" color="primary" />}
              value={isEditing}
              onChange={(event, checked) => {
                setEditing(checked);
              }}
              label="Edit"
            />
          </div>
          <Divider className={styles.longerDivider} />
          <TicketContent isEditing={isEditing} ticket={ticket} columnId={columnId} showTitle />
          <DeleteConfirmDialog onDelete={onDelete} open={isDeleteRequested} onClose={() => setDeleteRequested(false)} />
        </Paper>
      ) : (
        <div>{!isLoading && <Alert severity="info">No Content to show</Alert>}</div>
      )}
      <Dialog open={deleteSuccessDialog} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText>Ticket deleted successfully. Please go to the main dashboard.</DialogContentText>
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
