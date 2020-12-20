import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  globalLoader: {
    position: 'fixed',
    left: 'calc(50% - 20px)',
    top: '40%',
    zIndex: 9999
  },
  localLoader: {
    position: 'absolute',
    marginTop: '60px',
    left: '50%',
    zIndex: 999999999
  }

}));
