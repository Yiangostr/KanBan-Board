import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { Divider, Grid, Select, MenuItem, TextField, FormControl, InputLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import TicketService from '../../service/ticket-service';
import { Tickets } from '../../models/Tickets';
import { dateFormatter, inputValueSetter } from '../../utils';
import {
  getColumnById,
  getColumnsIdOfBoard,
  setTicketById,
  moveTicketBetweenColumns,
} from '../../reducer/base-reducer';
import { useTicketContentStyle } from './styles';

interface Props {
  isEditing: boolean;
  ticket: Tickets;
  showTitle?: boolean;
  columnId: string;
}

export default function TicketContent({ isEditing, ticket, showTitle, columnId }: Props) {
  const dispatch = useDispatch();
  const columnsById = useSelector(getColumnById);
  const columnsOfBoard = useSelector(getColumnsIdOfBoard);
  const classes = useTicketContentStyle();

  const [description, setDescription] = useState(ticket.description);

  const saveOnBlur = () => {
    const updateTicket = { ...ticket };
    updateTicket.description = description;
    TicketService.updateTicket(updateTicket);
  };

  const onColumnChange = (event: React.ChangeEvent<any>) => {
    const newColumnId = (event.target as HTMLInputElement).value;
    dispatch(
      moveTicketBetweenColumns({
        currentIndex: columnsById[columnId].ticketIds.indexOf(ticket.id),
        newIndex: columnsById[newColumnId].ticketIds.length,
        currentColumn: columnId,
        newColumn: newColumnId,
      }),
    );
    const sourceLastIndex = columnsById[columnId].ticketIds.length;
    const destinationLastIndex = columnsById[newColumnId].ticketIds.length;
    (async () => {
      await TicketService.moveTicket(
        ticket.id,
        columnId,
        sourceLastIndex,
        columnsById[columnId].ticketIds.indexOf(ticket.id),
      );
      await TicketService.moveTicket(
        ticket.id,
        newColumnId,
        columnsById[newColumnId].ticketIds.length,
        destinationLastIndex,
      );
    })();
  };

  const onValueChange = (key: string, value: string) => {
    dispatch(
      setTicketById({
        id: ticket.id,
        data: { ...ticket, [key]: value, updatedAt: Date.now() },
      }),
    );
  };

  return (
    <>
      {isEditing ? (
        <>
          <FormControl fullWidth>
            <InputLabel>Column</InputLabel>
            <Select fullWidth variant="outlined" label="Column" value={columnId} onChange={onColumnChange}>
              {columnsOfBoard.map((colId) => (
                <MenuItem value={colId} key={colId}>
                  {columnsById[colId].title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-name"
            label="Title"
            variant="outlined"
            fullWidth
            value={ticket.title}
            onBlur={() => saveOnBlur()}
            onChange={(event) => {
              onValueChange('title', event.target.value);
            }}
          />
          <TextField
            fullWidth
            id="outlined-name"
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={inputValueSetter(setDescription)}
            onBlur={(event) => {
              onValueChange('description', event.target.value);
              saveOnBlur();
            }}
          />
        </>
      ) : (
        <>
          {showTitle && (
            <>
              <Typography variant="h6">Title: </Typography>
              <Typography className={classes.title}>{ticket.title}</Typography>
            </>
          )}

          <Typography variant="h6">Column Name: </Typography>
          <Typography className={classes.title}>{columnsById[columnId].title}</Typography>

          <Typography variant="h6">Description: </Typography>
          <Typography className={classes.title}>{ticket.description}</Typography>
        </>
      )}

      <Divider className={classes.divider} />
      <Grid container>
        <Grid item xs={2}>
          Created At:
        </Grid>
        <Grid item xs={4}>
          {dateFormatter(ticket.createdAt)}
        </Grid>
        <Grid item xs={2}>
          Updated At:
        </Grid>
        <Grid item xs={4}>
          {dateFormatter(ticket.updatedAt)}
        </Grid>
      </Grid>
    </>
  );
}
