import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1,
  
   },

    background: {
      marginTop: "50px",
      paddingBottom: '80px',
      
    },
    container: {
      color: 'white',
      
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

    matchContainer: {
      borderTop: '2px solid gray',
      backgroundColor: '##272727',
      borderBottom: '2px solid gray',
      borderRadius: '2px',
      marginTop: '12px',
      
      
    },
    matchSubContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',

    },
    placementText: {
      marginTop: '6px',
      fontSize: '18px',

    },

    timeAgo: {
      marginTop: '3px',
      fontSize: '11px',
      marginBottom:'6px',

    },
    matchSubContainerText: {
      fontSize: '14px',

    },

    llImage: {
      objectFit: 'cover',
      width: '4em',
      height: '4.5em',
      borderRadius: '10px',

    },
    traitSubContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '200px',
      
    },
    traitBackground: {
      height: '60px',
      width:'60px',  

    },

    traits: {
      height: '1em',
      width: '1em',
      alignSelf: 'center',

    },
    traitContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
        
    },
    championSubContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      
    },
    championImage: {
      height: '40px',
      width: '40px',
      margin: '2px',
      border: '2px solid red'

    },
    items: {
      margin: '1px',
      height:'12px',
      width: '12px',

    }, 
    star: {
      height:'14px',
      width: '14px',
      
    },
    summonerError: {
      marginLeft: '20px',
      color: 'white',
      fontSize: '26px',
    },

  }));

  export default useStyles;