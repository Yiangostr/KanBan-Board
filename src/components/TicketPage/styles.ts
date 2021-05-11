import { makeStyles } from '@material-ui/core/styles';

export const useTicketPageStyle = makeStyles(() => ({
  container: {
    height: '100%',
  },

  paper: {
    padding: 30,
    maxWidth: '600px',
    minWidth: '600px',
  },

  longerDivider: {
    margin: '15px -20px',
  },
}));
