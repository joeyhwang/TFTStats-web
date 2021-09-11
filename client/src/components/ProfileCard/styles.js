import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({

    profileIcon: {
      width: '9rem',
      marginLeft: '1.2rem',
      borderRadius: '6px',
    },

    renewButton: {
      marginTop: '2.5rem',
      color: 'white',
      backgroundColor: 'gray', 
      fontSize: '1rem',
      padding: '0.5 1rem',
    },
    rankEmblem: {
      marginLeft: '0.5rem',
      width: '145px',
      
    },
    title: {
      fontSize: '1.5rem',
      fontWeight: '550',
      color: '#fff',
    },
    region : {
      fontSize: '18px',
      backgroundColor : 'gray',
      color: 'white',
      padding: '4px',
      borderRadius: '6px',
      

    },
    summonerLevel: {
      fontSize: '14px',
      color: 'white',
    },
    lp: {
      fontSize: '18px',
      color: 'white',
    },
    winsText: {
      fontSize: '16px',
      marginTop: '0.5px',
      color: 'white',
      
    },


    firstRowPaper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '210px',
      backgroundColor: '#272727',
    
    },

    

  }));

  export default useStyles;