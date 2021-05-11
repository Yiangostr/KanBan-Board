import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';

import BoardService from '../../service/board-service';
import { inputValueSetter } from '../../utils';
import { useDispatch } from 'react-redux';
import { addBoard } from '../../reducer/base-reducer';
import { boardFactory } from '../../models/factory';
import { Board } from '../../models/Board';

export interface AddNewBoardDialogProps {
  onClose: () => void;
  open: boolean;
}

const AddNewBoardDialog = (props: AddNewBoardDialogProps) => {
  const { onClose, open } = props;
  const [boardName, setBoardName] = useState('');
  const [boardAlias, setBoardAlias] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

  const dispatch = useDispatch();

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    const newBoard: Board = boardFactory(boardName, boardDescription, boardAlias);
    BoardService.createBoard(newBoard);
    dispatch(addBoard(newBoard));
    onClose();
  };

  return (
    <Dialog maxWidth="xs" open={open}>
      <DialogTitle>Add New Board</DialogTitle>
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Name"
          value={boardName}
          onChange={inputValueSetter(setBoardName)}
          variant="outlined"
          placeholder="Board title"
        />
        <TextField
          fullWidth
          label="Alias"
          placeholder="Unique Alias"
          variant="outlined"
          value={boardAlias}
          onChange={inputValueSetter(setBoardAlias)}
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={2}
          placeholder="This board is for ..."
          variant="outlined"
          value={boardDescription}
          onChange={inputValueSetter(setBoardDescription)}
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary" variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewBoardDialog;
