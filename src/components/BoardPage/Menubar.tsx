import React, { Fragment, useState } from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ProjectsIcon from '@material-ui/icons/Apps';
import { Link } from 'react-router-dom';

import RenameDialog from '../shared/RenameDialog';
import BoardService from '../../service/board-service';

import { useMenubarStyles } from './styles';
import { getSelectedBoard, setSelectedBoard } from '../../reducer/base-reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function Menubar() {
  const classes = useMenubarStyles();
  const [isRequestTitleChange, setRequestTitleChange] = useState(false);
  const dispatch = useDispatch();

  const selectedBoard = useSelector(getSelectedBoard);

  const handleOnRename = (val: string) => {
    BoardService.updateBoard(selectedBoard.id, val);
  };

  const handleOnChange = (value: string) => {
    dispatch(setSelectedBoard({ ...selectedBoard, title: value }));
  };

  return (
    <Fragment>
      <MuiAppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton className={classes.menuButton} edge="start" color="inherit">
              <ProjectsIcon />
            </IconButton>
          </Link>

          <Typography variant="h6" className={classes.title} onDoubleClick={() => setRequestTitleChange(true)}>
            {selectedBoard.title}
          </Typography>
          <RenameDialog
            open={isRequestTitleChange}
            setOpen={setRequestTitleChange}
            onRename={handleOnRename}
            onChange={handleOnChange}
            title={selectedBoard.title}
            model="board"
          />
        </Toolbar>
      </MuiAppBar>
    </Fragment>
  );
}
