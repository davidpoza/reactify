import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
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
  }
})
);