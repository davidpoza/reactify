import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  root: {
    display: 'block',
    backgroundColor: '#282828',
    width: '100%',
    position: 'fixed',
    padding: '0.5rem',
    bottom: 0,
    left: 0,
    zIndex: 9999,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  controls: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column'
  },
  buttons: {
    textAlign: 'center',
  },
  currentTime: {
    width: '5ch',
    textAlign: 'center',
  },
  length: {
    width: '5ch',
    textAlign: 'center',
  },
  bar: {
    display: 'flex',
    padding: '10px',
    justifyContent: 'center',
  },
  playBtn: {
    padding: '0 15px 0 15px',
  },
  playIcon: {
    fontSize: '40px',
    padding: 0,
    color: '#b3b3b3',
  },
  previousIcon: {
    color: '#b3b3b3',
  },
  nextIcon: {
    color: '#b3b3b3',
  },
  info: {
    width: '25%',
    padding: '10px',
  },
  extra: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '25%',
    padding: '10px',
  },
  extraIcon: {
    margin: '0 2px 0 2px',
    verticalAlign: 'middle',
    color: '#b3b3b3',
    '&:hover': {
      color: 'white',
    }
  },
  extraButton: {
    padding: 0
  }

}));
