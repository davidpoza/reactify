import { makeStyles } from '@material-ui/core/styles';
import config from '../../utils/config';

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
    height: '98vh',
    padding: 0,
  },
  icon: {
    color: '#fff',
  }
}));
