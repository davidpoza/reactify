import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: 180,
  },
  actionArea: {
    padding: 14,
  },
  content: {
    padding: '16px 0 16px 0'
  },
  media: {
    height: 160,
    borderRadius: '3px',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  author: {
    fontSize: '1rem',
  },
  icon: {
    position: 'absolute',
    top: 120,
    right: 20,
    fontSize: '3rem',
  },

}));
