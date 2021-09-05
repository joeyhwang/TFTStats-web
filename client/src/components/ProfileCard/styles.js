import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({

    profileIcon: {
      height: '130px',
      width: '130px',
      marginLeft: '20px',
      borderRadius: '6px',
    },
    renewButton: {
      marginTop: '25px',
      minHeight: '40px',
      width: '25%',
      color: 'white',
      backgroundColor: 'gray', 
      fontSize: '12px',
      
    },
    rankEmblem: {
      marginLeft: '10px',
      marginRight: '3px',
      height: '145px',
      width: '145px',
      
    },
    title: {
      fontSize: '22px',
      fontWeight: '550',
      color: 'white',
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