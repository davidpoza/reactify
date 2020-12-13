import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  form: {
    display: 'flex',
    justifyContent: props => props.isMobile ? 'center' : 'flex-end',
    alignItems: 'center',
    height: '2em',
    margin: '1em 1em 2em 1em',
  },
  textfield: {
    width: props => props.isMobile ? '100%' : 'auto',
  },
  input: {
    color: '#8a8a8a',
    fontSize: '1.2em',
    padding: '0.5em 1em 0.5em 1em',
    borderRadius: '500px',
    border: 'none',
    backgroundColor: 'white',
    marginRight: '1em',
    '&:focus': {
      outline: 'none',
      backgroundColor: 'white'
    }
  }

}));
