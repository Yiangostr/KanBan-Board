import { makeStyles } from '@material-ui/core/styles';

export const useDashboardStyles = makeStyles(() => ({
  content: {
    flexGrow: 1,
    height: `calc(100vh - 65px)`, // 65 is height of appbar
  },
  loader: {
    height: 200,
  },
}));

export const usePlaceHolderAddNewButtonStyles = makeStyles(() => ({
  container: {
    flexBasis: 350,
    marginTop: 12,
  },
}));

export const useTicketContentStyle = makeStyles(() => ({
  title: {
    marginLeft: 10,
  },
  divider: {
    marginTop: 20,
    marginBottom: 15,
  },
}));
