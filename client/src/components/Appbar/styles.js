import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    title: {
      color: 'white',
      fontSize: '1.5rem',
      margin: '5px',
      textTransform: 'none',
      textDecoration: 'none',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem'
      },
      "&:hover": {
        cursor: 'pointer',
      }
    },
    
    linkContainer: {
      display: 'flex',
      flex: 1,
      justifyContent: 'center',

      
    },

  }));

  export default useStyles;