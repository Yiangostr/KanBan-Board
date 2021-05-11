import React, { useEffect, useState } from 'react';

import DashboardIcon from '@material-ui/icons/Dashboard';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, ListItemText, List, ListItem, ListItemIcon, Button } from '@material-ui/core';

import AddNewBoardDialog from './AddNewBoardDialog';
import BoardService from '../../service/board-service';
import { useHomePageStyles } from './styles';
import { getAllBoards, setAllBoards, clearStore } from '../../reducer/base-reducer';

const HomePage = () => {
  const [showAddNewDialog, setShowAddNewDialog] = useState(false);
  const styles = useHomePageStyles();

  const allBoards = useSelector(getAllBoards);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const boards = await BoardService.getAllBoards();
      dispatch(setAllBoards(boards));
    })();
  }, []);

  const navigateTo = (alias: string) => {
    dispatch(clearStore);
    history.push(`/${alias}`);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center" className={styles.container}>
      <Paper className={styles.boardListPaper}>
        <List component="nav" aria-label="secondary mailbox folder">
          {allBoards.map(({ id, title, alias }) => (
            <ListItem button onClick={() => navigateTo(alias)} key={id}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={title} secondary={alias} />
            </ListItem>
          ))}
        </List>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item>
            <Button color="primary" className={styles.addNewButton} onClick={() => setShowAddNewDialog(true)}>
              Add New Board
            </Button>
            <AddNewBoardDialog onClose={() => setShowAddNewDialog(false)} open={showAddNewDialog} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default HomePage;
