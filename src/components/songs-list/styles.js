import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  listWrapper: {
    flexGrow: 1,
  },
  number: {
    minWidth: '50px',
    width: '50px',
    flex: 'none',
    textAlign: 'center',
  },
  icon: {
    display: 'block',
    minWidth: '50px',
    width: '50px',
    textAlign: 'center',
  },
  title: {
    minWidth: '240px',
    flex: '4 4 400px',
  },
  playingTitle: {
    minWidth: '240px',
    flex: '4 4 400px',
    color: '#309b48',
  },
  duration: {
    flex: '1 1 100px',
  },
  row: {
    paddingLeft: 0,
    paddingRight: 0,
    '&:hover': {
      backgroundColor: '#2a2a2a',
    }
  },
  rowHeader: {
    color: '#afafaf',
    borderBottom: '1px solid #2f2f2f',
  },
  headerNumber: {
    minWidth: '50px',
    width: '50px',
    flex: 'none',
    textAlign: 'center',
  },
  headerDuration: {
    color: '#afafaf',
    flex: '1 1 100px',
    alignItems: 'center',
  },
  headerTitle: {
    minWidth: '240px',
    flex: '4 4 400px',
  }

}));
