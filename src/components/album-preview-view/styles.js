import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '3em',
    marginBottom: '30px',
  },
  dataBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginLeft: '2em',
  },
  title: {
    fontSize: '3.5em',
    margin: 0,
  },
  data: {
    fontSize: '1em',
    margin: 0,
  },
  cover: {
    width: 232,
    boxShadow: '0 4px 60px rgba(0,0,0,.5)',
  },
  playIcon: {
    fontSize: '4rem',
    height: '74px',
    '&:hover': {
      transform: 'scale(1.1)',
    }
  },
  warn: {
    fontSize: '0.8em',
    color: '#d63934',
    backgroundColor: '#e6f0f9',
    padding: '1em',
    margin: '0 10px',
    borderRadius: '5px',
  }
})
);