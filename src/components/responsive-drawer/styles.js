import { makeStyles } from '@material-ui/core/styles';
import config from '../../config';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: config.drawerWidth,
      flexShrink: 0,
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    textAlign: 'center',
    fontSize: '2rem',
    padding: '0.5rem',
  },
  drawerPaper: {
    width: config.drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
