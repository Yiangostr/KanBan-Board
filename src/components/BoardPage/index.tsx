import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Kanban from './Kanban';
import Menubar from './Menubar';
import { useParams } from 'react-router-dom';
import { useDashboardStyles } from './styles';
import { fetchDataForBoard } from '../../utils';

interface Params {
  alias: string;
}

const BoardPage = () => {
  const dashBoardStyle = useDashboardStyles();

  const params = useParams<Params>();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataForBoard(params, dispatch)
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to fetch data');
      });
  }, []);

  return (
    <>
      <Menubar />
      <div className={dashBoardStyle.content}>
        {loading ? (
          <Grid container direction="row" justify="center" alignItems="center" className={dashBoardStyle.loader}>
            <CircularProgress />
          </Grid>
        ) : (
          <Kanban />
        )}
      </div>
    </>
  );
};

export default BoardPage;
