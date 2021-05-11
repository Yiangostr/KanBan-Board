import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DeleteConfirmDialog from '../../shared/DeteleConfirmDialog';
import RenameDialog from '../../shared/RenameDialog';
import ColumnService from '../../../service/column-service';

import { deleteColumn, getColumnById, setColumnById } from '../../../reducer/base-reducer';
import { columnFactory } from '../../../models/factory';

interface Props {
  colId: string;
}

export default function ColumnAction({ colId }: Props) {
  const dispatch = useDispatch();
  const column = useSelector(getColumnById)[colId];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDeleteRequested, setDeleteRequest] = useState(false);
  const [isRenameRequested, setRenameRequest] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = () => {
    dispatch(deleteColumn({ colId }));
    ColumnService.deleteColumn(colId);
  };

  const onNameChange = (value: string) => {
    dispatch(setColumnById({ id: colId, data: { ...column, title: value } }));
  };

  const saveRename = (value: string) => {
    const updatingColumn = columnFactory(value);
    updatingColumn.id = colId;
    ColumnService.updateColumn(updatingColumn);
  };

  const openRenameDialog = () => {
    setRenameRequest(true);
    handleClose();
  };

  const openDeleteDialog = () => {
    handleClose();
    setDeleteRequest(true);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <DeleteConfirmDialog onDelete={onDelete} open={isDeleteRequested} onClose={() => setDeleteRequest(false)} />
      <RenameDialog
        open={isRenameRequested}
        setOpen={setRenameRequest}
        onChange={onNameChange}
        title={column.title}
        model="column"
        onRename={saveRename}
      />
      <Menu id="long-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem onClick={openRenameDialog}>Rename</MenuItem>
        <MenuItem onClick={openDeleteDialog} color={'secondary'}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
