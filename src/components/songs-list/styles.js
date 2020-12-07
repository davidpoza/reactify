import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
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
  duration: {
    flex: '1 1 100px',
  },
  row: {
    paddingLeft: 0,
    paddingRight: 0,
    '&:hover': {
      backgroundColor: '#2a2a2a',
    }
  }

}));
