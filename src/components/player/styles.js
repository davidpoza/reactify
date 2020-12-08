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
  duration: {
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
  },
  previousIcon: {

  },
  nextIcon: {

  }

}));
