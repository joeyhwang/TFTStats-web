import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
  
   },

    avgRankContainer: {
      color: 'white',
      marginBottom: '2px',
    },

    avgRankTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },

    avgRankText: {
      fontSize: '18px',
      fontWeight: '600',
      
    },

    firstRowPaper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '210px',
      backgroundColor: '#272727',
    
    },
    firstRowSubContainer: {
      marginBottom: '40px',

    },


  }));

  export default useStyles;