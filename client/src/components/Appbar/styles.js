import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    title: {
      color: 'white',
      fontSize: '1.5rem',
      margin: '5px',
      textTransform: 'none'
      
    },
    linkContainer: {
      
      display: 'flex',
      flex: 1,
      justifyContent: 'center'
    },
    searchContainer: {
      
    },
    searchBox: {
      
    }
  }));

  export default useStyles;