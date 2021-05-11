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

export const useMenubarStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
}));

export const useCommonStyles = makeStyles(() => ({
  dragHandle: {
    left: 4,
    top: 10,
    color: 'rgba(0, 0, 0, 0.54)',
  },
}));

export const useBoardStyles = makeStyles((theme) => ({
  board: {
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
  },
  lanes: {
    flexGrow: 1,
    display: 'flex',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    padding: theme.spacing(1.5),
  },
  laneContainer: {
    flexBasis: 350,
    flexGrow: 0,
    flexShrink: 0,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: theme.spacing(1.5),
    // border: '1px solid #e1e4e8',
  },
  newStatusLane: {
    flexBasis: 350,
    minWidth: 100,
    border: '3px dashed #e1e4e8',
    borderRadius: 0,
  },
  dialog: {
    padding: theme.spacing(2),
  },
}));

export const useLaneStyles = makeStyles((theme) => ({
  lane: {
    display: 'flex',
    flexDirection: 'column',
    // height: '100%',
    background: '#eff1f3',
    overflowY: 'auto',
  },
  laneHeader: {
    padding: theme.spacing(1),
    display: 'flex',
    width: '100%',
  },
  laneTitle: {
    flexGrow: 1,
    // marginLeft: theme.spacing(6),
    fontWeight: 'bold',
  },
  tasks: {
    padding: theme.spacing(1.5),
  },
  taskContainer: {
    marginBottom: theme.spacing(0.5),
    display: 'flex',
  },
}));

export const useCardStyles = makeStyles((theme) => ({
  task: {
    padding: theme.spacing(1),
    width: '100%',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 2,
  },
}));

export const useTaskDialogStyle = makeStyles(() => ({
  iconButton: {
    float: 'right',
    padding: 7,
  },
  switchController: {
    float: 'right',
  },
  dialogActions: {
    justifyContent: 'space-between',
  },
}));
