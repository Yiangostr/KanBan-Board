import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  onRename: (val: string) => void;
  onChange: (val: string) => void;
  title: string;
  model: string;
}

export default function RenameDialog({ open, setOpen, onRename, onChange, title, model }: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Rename</DialogTitle>
      <DialogContent>
        <DialogContentText>Rename the {model} title</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="New Column Name"
          fullWidth
          value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onRename(title);
            setOpen(false);
          }}
          color="primary"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
