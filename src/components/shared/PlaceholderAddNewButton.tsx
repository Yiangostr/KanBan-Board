import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import { inputValueSetter } from '../../utils';
import { useBoardStyles } from '../BoardPage/styles';
import { usePlaceHolderAddNewButtonStyles } from './styles';

interface Props {
  buttonName: string;
  onAdd: (value: string) => void;
}

export default function PlaceholderAddNewButton(props: Props) {
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState('');
  const classNames = useBoardStyles();
  const componentClassName = usePlaceHolderAddNewButtonStyles();

  const onOK = () => {
    if (value !== '') {
      props.onAdd && props.onAdd(value);
      setEditing(false);
      setValue('');
    }
  };

  return (
    <div className={componentClassName.container}>
      {isEditing ? (
        <>
          <TextField autoFocus value={value} fullWidth onChange={inputValueSetter(setValue)} />
          <Grid container direction="row" spacing={1}>
            <Grid item xs={6}>
              <Button fullWidth className={classNames.newStatusLane} onClick={onOK} variant="outlined">
                OK
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                className={classNames.newStatusLane}
                onClick={() => setEditing(false)}
                variant="outlined"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <Button className={classNames.newStatusLane} onClick={() => setEditing(true)} fullWidth variant="outlined">
          {props.buttonName}
        </Button>
      )}
    </div>
  );
}
