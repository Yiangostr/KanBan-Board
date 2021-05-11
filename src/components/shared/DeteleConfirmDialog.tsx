import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface Props {
  onDelete: (event?: any) => void;
  open: boolean;
  onClose: (event?: any) => void;
}

export default function DeleteConfirmDialog({ open, onClose, onDelete }: Props) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">Confirm</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="primary">
          No
        </Button>
        <Button onClick={onDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
